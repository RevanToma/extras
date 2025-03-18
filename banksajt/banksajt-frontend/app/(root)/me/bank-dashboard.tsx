'use client';
import { useState } from 'react';
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
import { motion } from 'motion/react';
import Transactions from './transactions';
import BalanceGoal from '@/components/balance-goal';

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


  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className='flex flex-col gap-6 justify-center p-6 items-center w-full my-7'
    >
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
        <Transactions transactionHistory={transactionHistory} />

        <BalanceGoal balance={accountBalance} />
      </div>
    </motion.div>
  );
};
export default BankDashboard;
