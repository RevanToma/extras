import { Metadata } from 'next';
import React from 'react';
import { getUser, signOutUser } from '@/actions/user.actions';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import BankDashboard from './account-details';

export const metadata: Metadata = {
  title: 'Account',
};

const AccountPage = async () => {
  const userData = await getUser();

  if (!userData) {
    redirect('/');
  }

  return (
    <div>
      <BankDashboard accountBalance={userData.balance} />

      <form
        className='flex flex-col gap-3 items-center justify-center'
        action={signOutUser}
      >
        <h1>Account</h1>
        <p>Welcome to your account page!</p>
        <Button type='submit' variant='destructive' className='cursor-pointer'>
          Logout
        </Button>
      </form>
    </div>
  );
};

export default AccountPage;
