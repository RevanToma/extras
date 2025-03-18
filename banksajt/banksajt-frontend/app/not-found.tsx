import React from 'react';
import Logo from '../components/logo';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <Logo className='text-5xl' />
      <div className='flex flex-col gap-2 items-center p-6 w-1/3 rounded-lg shadow-md '>
        <h1 className='text-3xl font-bold mb-4'>Page Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
        <Link
          href='/'
          className='px-5 py-2 rounded-lg text-white bg-gradient-to-r
           from-emerald-400 to-sky-500
           hover:from-emerald-500
           hover:to-sky-600 transition duration-300 shadow-md text-md font-medium'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
