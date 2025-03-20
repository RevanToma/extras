import { Metadata } from 'next';
import { getUser } from '@/actions/user.actions';
import { redirect } from 'next/navigation';

import { getTransactions } from '@/actions/transactions.actions';
import BankDashboard from './bank-dashboard';

export const metadata: Metadata = {
  title: 'Account',
};

export const dynamic = 'force-dynamic';

const AccountPage = async () => {
  const userData = await getUser(),
    transactionsHistory = await getTransactions();

  if (!userData || !transactionsHistory) {
    redirect('/');
  }

  return (
    <BankDashboard
      accountBalance={userData.account.balance}
      transactionHistory={transactionsHistory}
    />
  );
};

export default AccountPage;
