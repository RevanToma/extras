'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { makeTransaction } from '@/actions/transactions.actions';
import { TransactionHistory } from '@/types';

const BankDashboard = ({
  accountBalance,
  transactionHistory,
}: {
  accountBalance: number;
  transactionHistory: TransactionHistory[];
}) => {
  const [balance, setBalance] = useState(accountBalance),
    [amount, setAmount] = useState(''),
    [transactions, setTransactions] =
      useState<TransactionHistory[]>(transactionHistory);

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    if (type === 'withdraw' && amt > balance) {
      alert('Insufficient funds!');
      return;
    }

    const response = await makeTransaction(amt, type);

    if (!response || !response.transaction) {
      alert('Transaction failed!');
      return;
    }

    setBalance(response.balance);
    setTransactions([response.transaction, ...transactions]);
    setAmount('');
  };

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className='min-h-screen flex flex-col items-center p-6 text-secondary'>
      <div
        className='w-full max-w-2xl shadow-lg rounded-lg p-6 text-center'
        style={{
          backgroundColor: 'oklch(0.18 0.05 264.695)',
        }}
      >
        <h1 className='text-3xl font-bold mb-4'>Transactions</h1>
        <div className='text-lg mb-6'>
          <p className='text-muted-foreground'>Your Balance</p>
          <p className='text-4xl font-bold text-green-600'>
            ${balance.toFixed(2)}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 justify-center mb-6 '>
          <Input
            type='number'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='sm:w-full md:w-2/3 '
          />
          <Button
            onClick={() => handleTransaction('deposit')}
            className='cursor-pointer '
          >
            Deposit
          </Button>
          <Button
            onClick={() => handleTransaction('withdraw')}
            className='cursor-pointer '
            variant='destructive'
          >
            Withdraw
          </Button>
        </div>

        <div className='text-left'>
          <h2 className='text-xl font-semibold mb-2'>Recent Transactions</h2>
          <ul className='p-4 rounded-lg max-h-96 overflow-y-auto'>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((tx) => (
                <li key={tx.id} className='border-b py-2 flex justify-between'>
                  <span>{tx.date}</span>
                  <span
                    className={
                      tx.type === 'deposit'
                        ? 'text-green-600 font-bold'
                        : 'text-red-600 font-bold'
                    }
                  >
                    {tx.type === 'deposit' ? '+$' : '-$'}
                    {tx.amount.toFixed(2)}
                  </span>
                </li>
              ))
            ) : (
              <p className='text-gray-500'>No transactions yet</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;
