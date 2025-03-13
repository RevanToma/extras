'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useCountUp from '@/hooks/useCountUp';

const LandingPage = ({ totalUsers }: { totalUsers: number }) => {
  const animatedUserCount = useCountUp(totalUsers);

  return (
    <div className='flex flex-col items-center justify-center h-screen p-6 gap-6 relative overflow-hidden text-center'>
      <div className='absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent blur-3xl' />

      <motion.h1
        className='text-5xl font-extrabold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 
            bg-clip-text text-transparent drop-shadow-lg'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to MoneyMate
      </motion.h1>

      <motion.p
        className='text-lg text-muted-foreground text-center max-w-md'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Manage your finances with ease. Secure transactions, real-time updates,
        and effortless banking—all at your fingertips.
      </motion.p>

      <motion.p
        className='text-lg font-medium text-gray-400'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        🚀 Join{' '}
        <span className='text-primary font-bold text-xl'>
          {animatedUserCount}
        </span>{' '}
        users already banking with us!
      </motion.p>

      <motion.div
        className='relative'
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1.5,
          ease: 'easeInOut',
        }}
      >
        <Button
          asChild
          size='lg'
          className='relative overflow-hidden bg-gradient-to-r
         from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-800 transition duration-300
         text-secondary text-lg font-semibold tracking-wider shadow-lg'
        >
          <Link href='/sign-up'>Get Started</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
