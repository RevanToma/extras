'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`,
      {
        username,
        password,
      }
    );

    if (response.status === 201) {
      const loginResponse = await signInUser(username, password);
      return loginResponse;
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const signInUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/sessions`,
      {
        username,
        password,
      }
    );

    if (response.status !== 200) {
      throw new Error('Invalid credentials');
    }
    const { token } = response.data;

    return { user: response.data.user, token };
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getUser = async () => {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new Error('Unauthorized');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/me/accounts`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Invalid token');
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const signInAction = async (
  formData: FormData
): Promise<{ success: boolean; error: null | string }> => {
  const username = formData.get('username') as string,
    password = formData.get('password') as string;

  try {
    const response = await signInUser(username, password);

    if (!response || !response.token) {
      throw new Error('Invalid credentials');
    }

    (await cookies()).set('token', response.token, { path: '/' });

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign in. Please check your credentials.',
    };
  }
};

export const signUpAction = async (
  formData: FormData
): Promise<{ success: boolean; error: null | string }> => {
  const username = formData.get('username') as string,
    password = formData.get('password') as string;

  try {
    const response = await createUser(username, password);

    if (!response || !response.token) {
      throw new Error('Invalid credentials');
    }

    (await cookies()).set('token', response.token, { path: '/' });

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign up. Please try again.',
    };
  }
};

export const logoutUser = async () => {
  (await cookies()).delete('token');
  redirect('/');
};
