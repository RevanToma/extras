'use client';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BalanceGoal = ({ balance }: { balance: number }) => {
  const [goal, setGoal] = useState(0),
    [startingBalance, setStartingBalance] = useState(balance),
    [customGoal, setCustomGoal] = useState('');

  useEffect(() => {
    const savedGoal = localStorage.getItem('balanceGoal'),
      savedStartingBalance = localStorage.getItem('startingBalance');

    if (savedGoal) setGoal(Number(savedGoal));
    if (savedStartingBalance) setStartingBalance(Number(savedStartingBalance));
  }, []);

  useEffect(() => {
    if (goal > 0) {
      localStorage.setItem('balanceGoal', goal.toString());
      localStorage.setItem('startingBalance', startingBalance.toString());
    }
  }, [goal, startingBalance]);

  const savedAmount = balance - startingBalance,
    progress = goal > 0 ? Math.min((savedAmount / goal) * 100, 100) : 0;

  const handleSetGoal = () => {
    const newGoal = parseFloat(customGoal);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
      setStartingBalance(balance);
      setCustomGoal('');
    } else {
      alert('Goal must be greater than 0.');
    }
  };

  const handleResetGoal = () => {
    setGoal(0);
    setStartingBalance(balance);
    localStorage.removeItem('balanceGoal');
    localStorage.removeItem('startingBalance');
  };

  return (
    <motion.div
      className='p-4 bg-muted rounded-lg shadow-lg w-full mt-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3 className='text-lg font-semibold text-center mb-2'>
        🎯 Savings Goal
      </h3>

      <Progress value={progress} className='w-full' />
      {progress >= 100 && (
        <motion.p
          className='text-green-500 font-bold mt-2 text-center'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          🎉 Goal Reached!
        </motion.p>
      )}

      <div className='flex items-center gap-2 mt-4'>
        <Input
          type='number'
          placeholder='Set savings goal'
          value={customGoal}
          onChange={(e) => setCustomGoal(e.target.value)}
          className='w-full'
        />
        <Button onClick={handleSetGoal} size='sm'>
          Set Goal
        </Button>
        <Button onClick={handleResetGoal} size='sm' variant='destructive'>
          Reset
        </Button>
      </div>

      <p className='text-sm text-muted-foreground text-center mt-2'>
        Goal:{' '}
        <span className='font-bold text-primary'>${goal || 'Not set'}</span>
      </p>

      {goal > 0 && progress !== 100 && (
        <p className='text-sm text-muted-foreground text-center mt-2'>
          Saved so far:{' '}
          <span className='font-bold text-green-500'>
            ${savedAmount > 0 ? savedAmount.toFixed(2) : '0'}
          </span>
        </p>
      )}
    </motion.div>
  );
};

export default BalanceGoal;
