'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type BankAction = 'deposit' | 'withdraw';

interface Transaction {
  type: BankAction;
  amount: number;
  date: string;
}

export default function BankDashboard({
  accountBalance,
}: {
  accountBalance: number;
}) {
  const [balance, setBalance] = useState(accountBalance);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (type: BankAction) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    if (type === 'withdraw' && amt > balance) {
      alert('Insufficient funds!');
      return;
    }

    const newBalance = type === 'deposit' ? balance + amt : balance - amt;
    setBalance(newBalance);
    setTransactions([
      { type, amount: amt, date: new Date().toLocaleString() },
      ...transactions,
    ]);

    setAmount('');
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-100 p-6'>
      <div className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center'>
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
          <ul className='bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto'>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <li key={index} className='border-b py-2 flex justify-between'>
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
}
