'use client';
import { TransactionHistory } from '@/types';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Calendar, DollarSign } from 'lucide-react';
import { useExchangeRates } from '@/hooks/useExchangeRates';

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

const Transactions = ({
  transactionHistory,
}: {
  transactionHistory: TransactionHistory[];
}) => {
  const { currency, convertAmount } = useExchangeRates();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'),
    [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const sortedTransactions = useMemo(() => {
    return [...transactionHistory].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
  }, [transactionHistory, sortOrder, sortBy]);

  return (
    <div className='text-left mt-6'>
      <h2 className='text-xl font-semibold mb-2'>Recent Transactions</h2>
      <div className='flex justify-between py-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          {sortOrder === 'asc' ? (
            <ArrowUp size={16} />
          ) : (
            <ArrowDown size={16} />
          )}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setSortBy((prev) => (prev === 'date' ? 'amount' : 'date'))
          }
        >
          Sort by {sortBy === 'date' ? 'Amount' : 'Date'}
          {sortBy === 'date' ? (
            <DollarSign size={16} />
          ) : (
            <Calendar size={16} />
          )}
        </Button>
      </div>
      <motion.ul
        className='p-4 rounded-lg max-h-96 overflow-y-auto'
        initial='hidden'
        animate='visible'
      >
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((tx) => {
            const convertedAmount = convertAmount(tx.amount, 'USD');

            return (
              <motion.li
                key={tx.id}
                className='border-b py-2 flex justify-between'
              >
                <span>{new Date(tx.date).toLocaleDateString()}</span>
                <span
                  className={
                    tx.type === 'deposit'
                      ? 'text-green-600 font-bold'
                      : 'text-destructive font-bold'
                  }
                >
                  {tx.type === 'deposit' ? '+' : '-'}
                  {formatCurrency(convertedAmount, currency)}
                </span>
              </motion.li>
            );
          })
        ) : (
          <motion.p className='text-gray-500'>No transactions yet</motion.p>
        )}
      </motion.ul>
    </div>
  );
};

export default Transactions;
