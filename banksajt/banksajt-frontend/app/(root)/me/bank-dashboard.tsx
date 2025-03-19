'use client';
import { TransactionHistory } from '@/types';
import AnimateBalance from '@/components/animate-balance';

import { motion } from 'motion/react';
import Transactions from './transactions';
import BalanceGoal from '@/components/balance-goal';
import TransactionInput from './transaction-input';

const BankDashboard = ({
  accountBalance,
  transactionHistory,
}: {
  accountBalance: number;
  transactionHistory: TransactionHistory[];
}) => {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      className='flex flex-col gap-6 justify-center p-6 items-center w-full my-7'
    >
      <div className='w-full max-w-2xl shadow-lg rounded-lg p-6 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Transactions</h1>

        <div className='flex items-center justify-between w-full'>
          <div className='flex flex-col items-start gap-2'>
            <p className='text-muted-foreground'>Your Balance</p>
            <AnimateBalance balance={accountBalance} />
          </div>
        </div>

        <TransactionInput />

        <Transactions transactionHistory={transactionHistory} />
        <BalanceGoal balance={accountBalance} />
      </div>
    </motion.div>
  );
};

export default BankDashboard;
