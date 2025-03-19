'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DarkBankingLanding = () => {
  const { theme } = useTheme(),
    [users, setUsers] = useState(12500),
    [transactions, setTransactions] = useState(200000),
    [moneyMoved, setMoneyMoved] = useState(7500000);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) => prev + Math.floor(Math.random() * 5));
      setTransactions((prev) => prev + Math.floor(Math.random() * 50));
      setMoneyMoved((prev) => prev + Math.floor(Math.random() * 500));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 md:px-10 `}
    >
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-sky-400/20 opacity-30 blur-3xl pointer-events-none'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.h1
        className='text-4xl md:text-6xl font-extrabold text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-300'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        The Future of Banking is Here.
      </motion.h1>

      <div className='mt-6 flex flex-col md:flex-row gap-6 text-lg md:text-2xl font-medium text-center md:text-left'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🚀 {users.toLocaleString()} Users
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          💳 {transactions.toLocaleString()} Transactions
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          💰 ${moneyMoved.toLocaleString()} Moved
        </motion.p>
      </div>

      <motion.div
        className='relative mt-10 w-full max-w-sm md:max-w-md lg:max-w-lg h-auto flex items-center justify-center'
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src='/3dbankcard.png'
          alt='3D Bank Card'
          width={370}
          height={240}
        />
      </motion.div>

      <motion.div
        className=''
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          asChild
          size={'lg'}
          className='text-lg font-semibold text-secondary bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-800 
          transition duration-300 px-8 py-4 w-full max-w-xs md:max-w-sm rounded-xl shadow-md'
        >
          <Link href='/sign-up'>Get Started</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default DarkBankingLanding;
