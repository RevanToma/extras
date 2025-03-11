'use client';
import Link from 'next/link';
import { Button } from './ui/button';

const LandingPage = () => {
  return (
    <>
      <h1 className='text-3xl font-bold'>Welcome to the Bank</h1>

      <nav className='mt-4 flex gap-4'>
        <Button asChild variant={'outline'}>
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
        <Button asChild>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      </nav>
    </>
  );
};
export default LandingPage;
