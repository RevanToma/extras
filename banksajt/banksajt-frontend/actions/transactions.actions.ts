'use server';
import { BankAction } from '@/types';
import axios from 'axios';
import { cookies } from 'next/headers';

export const makeTransaction = async (amount: number, type: BankAction) => {
  const token = (await cookies()).get('token')?.value;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/me/accounts/transactions`,
      { amount, type, token }
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);
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

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
