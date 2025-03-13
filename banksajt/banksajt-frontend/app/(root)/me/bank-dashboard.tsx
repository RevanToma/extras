'use client';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { makeTransaction } from '@/actions/transactions.actions';
import { TransactionHistory } from '@/types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import TransactionChart from '@/components/transaction-chart';
import AnimateBalance from '@/components/animate-balance';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const BankDashboard = ({
  accountBalance,
  transactionHistory,
}: {
  accountBalance: number;
  transactionHistory: TransactionHistory[];
}) => {
  const [amount, setAmount] = useState(''),
    queryClient = useQueryClient(),
    [isLoading, setIsLoading] = useState(false),
    [showChart, setShowChart] = useState(false);

  const transactionMutation = useMutation({
    mutationFn: (data: { amount: number; type: 'deposit' | 'withdraw' }) =>
      makeTransaction(data.amount, data.type),
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
    <div className='flex flex-col gap-6 justify-center p-6 items-center w-full'>
      <div className='w-full max-w-2xl shadow-lg rounded-lg p-6 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Transactions</h1>

        <div className='flex items-center justify-between w-full'>
          <div>
            <p className='text-muted-foreground'>Your Balance</p>
            <AnimateBalance balance={accountBalance} />
          </div>
          <Button
            variant='outline'
            size='sm'
            className='cursor-pointer'
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? 'Hide Chart' : 'View Chart'}
          </Button>
        </div>

        {showChart && (
          <div className='mt-4 bg-muted p-4 rounded-lg'>
            <TransactionChart transactions={transactionHistory} />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='link'
                  size='sm'
                  className='mt-2 text-primary cursor-pointer'
                >
                  Expand Full View
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-4xl'>
                <DialogTitle>Transaction History</DialogTitle>
                <TransactionChart transactions={transactionHistory} />
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className='flex flex-col md:flex-row gap-4 justify-center mt-6'>
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

        <div className='text-left mt-6'>
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
    </div>
  );
};
export default BankDashboard;
