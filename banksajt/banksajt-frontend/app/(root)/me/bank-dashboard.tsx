'use client';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { makeTransaction } from '@/actions/transactions.actions';
import { TransactionHistory } from '@/types';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const BankDashboard = ({
  accountBalance,
  transactionHistory,
}: {
  accountBalance: number;
  transactionHistory: TransactionHistory[];
}) => {
  const [amount, setAmount] = useState(''),
    queryClient = useQueryClient(),
    [isLoading, setIsLoading] = useState(false);

  const transactionMutation = useMutation({
    mutationFn: ({
      amount,
      type,
    }: {
      amount: number;
      type: 'deposit' | 'withdraw';
    }) => makeTransaction(amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    setIsLoading(true);
    try {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt <= 0) {
        alert('Invalid amount!');
        return;
      }

      await transactionMutation.mutateAsync({ amount: amt, type });
      setAmount('');
    } catch (error: any) {
      alert(error.message || 'Transaction failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const sortedTransactions = useMemo(
    () =>
      [...transactionHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactionHistory]
  );

  return (
    <div className=' flex gap-4 justify-center p-6 '>
      <div className='w-full max-w-2xl shadow-lg rounded-lg p-6 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Transactions</h1>
        <div className='text-lg mb-6'>
          <p className='text-muted-foreground'>Your Balance</p>
          <p className='text-4xl font-bold text-green-600'>
            ${accountBalance.toFixed(2)}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 justify-center mb-6'>
          <Input
            type='number'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='sm:w-full md:w-2/3'
          />
          <Button
            onClick={() => handleTransaction('deposit')}
            disabled={isLoading}
            className='cursor-pointer'
          >
            {isLoading ? 'Processing...' : 'Deposit'}
          </Button>
          <Button
            onClick={() => handleTransaction('withdraw')}
            variant='destructive'
            disabled={isLoading}
            className='cursor-pointer'
          >
            {isLoading ? 'Processing...' : 'Withdraw'}
          </Button>
        </div>

        <div className='text-left'>
          <h2 className='text-xl font-semibold mb-2'>Recent Transactions</h2>
          <ul className='p-4 rounded-lg max-h-96 overflow-y-auto'>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((tx) => (
                <li key={tx.id} className='border-b py-2 flex justify-between'>
                  <span>{new Date(tx.date).toLocaleDateString()}</span>
                  <span
                    className={
                      tx.type === 'deposit'
                        ? 'text-green-600 font-bold'
                        : 'text-destructive font-bold'
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
      <div className='flex flex-col gap-4 items-center p-3'></div>
    </div>
  );
};
export default BankDashboard;
