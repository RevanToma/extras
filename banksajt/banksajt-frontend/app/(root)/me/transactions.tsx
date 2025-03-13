import { TransactionHistory } from '@/types';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Transactions = ({
  transactionHistory,
}: {
  transactionHistory: TransactionHistory[];
}) => {
  const sortedTransactions = useMemo(
    () =>
      [...transactionHistory].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactionHistory]
  );

  return (
    <div className='text-left mt-6'>
      <h2 className='text-xl font-semibold mb-2'>Recent Transactions</h2>
      <motion.ul
        className='p-4 rounded-lg max-h-96 overflow-y-auto'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, // Delay for smooth entry
        }}
      >
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((tx) => (
            <motion.li
              key={tx.id}
              className='border-b py-2 flex justify-between'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
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
            </motion.li>
          ))
        ) : (
          <motion.p
            className='text-gray-500'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No transactions yet
          </motion.p>
        )}
      </motion.ul>
    </div>
  );
};

export default Transactions;
