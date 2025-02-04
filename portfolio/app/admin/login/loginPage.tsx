'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [password, setPassword] = useState(''),
    router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('isAuthenticated') === 'true'
    ) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/admin');
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center  text-white'>
      <h1 className='text-3xl font-bold mb-6'>Admin Login</h1>
      <input
        type='password'
        className='p-2 border border-gray-600 rounded-md bg-gray-800 text-white'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className='mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600'
      >
        Login
      </button>
    </main>
  );
};
export default LoginPage;
