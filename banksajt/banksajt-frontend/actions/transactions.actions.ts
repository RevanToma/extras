'use server';
import { BankAction } from '@/types';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const makeTransaction = async (amount: number, type: BankAction) => {
  const token = (await cookies()).get('token')?.value;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/me/accounts/transactions`,
      { amount, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath('/me');
    return response.data;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.response?.data?.message || 'Transaction failed');
  }
};

export const getTransactions = async () => {
  const token = (await cookies()).get('token')?.value;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/me/accounts/transactions`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.transactions;
  } catch (error) {
    console.error('Error:', error);
  }
};
