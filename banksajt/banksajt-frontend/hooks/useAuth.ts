'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInUser, createUser } from '@/actions/user.actions';

export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAuth = async (
    action: 'signIn' | 'signUp',
    username: string,
    password: string
  ) => {
    setLoading(true);

    try {
      const { token } =
        action === 'signIn'
          ? await signInUser(username, password)
          : await createUser(username, password);

      if (token) {
        localStorage.setItem('token', token);
        router.push('/me');
      }
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      alert(`Failed to ${action}, please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return { handleAuth, loading };
}
