import { Metadata } from 'next';
import { getAuditLogs, getUser, signOutUser } from '@/actions/user.actions';
import { redirect } from 'next/navigation';

import { getTransactions } from '@/actions/transactions.actions';
import BankDashboard from './bank-dashboard';

export const metadata: Metadata = {
  title: 'Account',
};

const AccountPage = async () => {
  const userData = await getUser(),
    transactionsHistory = await getTransactions();

  if (!userData || !transactionsHistory) {
    redirect('/');
  }

  return (
    <div>
      <BankDashboard
        accountBalance={userData.account.amount}
        transactionHistory={transactionsHistory.transactions}
      />
    </div>
  );
};

export default AccountPage;
