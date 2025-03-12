'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const getAuditLogs = async () => {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) throw new Error('Unauthorized');

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/me/accounts/audit-logs`,
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
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || 'An error occurred' };
    }

    return { error: error.message || 'Something went wrong' };
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

export const signInAction = async (prevState: unknown, formData: FormData) => {
  const username = formData.get('username') as string,
    password = formData.get('password') as string;

  try {
    const response = await signInUser(username, password);

    if (!response || !response.token) {
      throw new Error('Invalid credentials');
    }

    (await cookies()).set('token', response.token, { path: '/' });

    return { success: true, message: 'Signed In Successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message.includes('exists')
        ? 'Username already exists'
        : error.message || 'Invalid credentials',
    };
  }
};

export const signUpAction = async (prevState: unknown, formData: FormData) => {
  const username = formData.get('username') as string,
    password = formData.get('password') as string;

  try {
    const response = await createUser(username, password);

    if (response?.error) {
      throw new Error(response.error);
    }

    if (!response?.token) {
      throw new Error('Invalid credentials');
    }

    (await cookies()).set('token', response.token, { path: '/' });

    return { success: true, message: 'Signed Up Successfully' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message.includes('exists')
        ? 'Username already exists'
        : error.message || 'Invalid credentials',
    };
  }
};

export const signOutUser = async () => {
  (await cookies()).delete('token');
};

export const getTotalUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`
    );

    if (!response) {
      throw new Error('Something went wrong');
    }

    return response.data.users;
  } catch (error) {
    console.error('Error:', error);
  }
};
