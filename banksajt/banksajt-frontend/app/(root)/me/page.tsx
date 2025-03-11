import { Metadata } from 'next';
import React from 'react';
import { getUser, logoutUser } from '@/actions/user.actions';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Account',
};

const AccountPage = async () => {
  const userData = await getUser();

  if (!userData) {
    redirect('/sign-in');
  }
  return (
    <form
      className='flex flex-col gap-3 items-center justify-center'
      action={logoutUser}
    >
      <h1>Account</h1>
      <p>Welcome to your account page!</p>
      <Button type='submit' variant='destructive' className='cursor-pointer'>
        Logout
      </Button>
    </form>
  );
};

export default AccountPage;
