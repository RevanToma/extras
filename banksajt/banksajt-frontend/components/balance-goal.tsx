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
    <div className='p-4 bg-muted rounded-lg shadow-lg w-full mt-6 flex flex-col gap-2'>
      <h3 className='text-lg font-semibold text-center '>🎯 Savings Goal</h3>

      <Progress value={progress} className='w-full' />
      {progress >= 100 && (
        <motion.p
          className='text-green-500 font-bold text-center'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          🎉 Goal Reached!
        </motion.p>
      )}

      <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row items-center gap-2 w-full'>
        <Input
          type='number'
          placeholder='Set savings goal'
          value={customGoal}
          onChange={(e) => setCustomGoal(e.target.value)}
          className='w-full border-muted-foreground'
        />
        <Button
          onClick={handleSetGoal}
          size='sm'
          className='w-full sm:w-full md:w-auto lg:w-auto cursor-pointer'
        >
          Set Goal
        </Button>
        <Button
          onClick={handleResetGoal}
          size='sm'
          variant='destructive'
          className='w-full sm:w-full md:w-auto lg:w-auto cursor-pointer'
        >
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
    </div>
  );
};

export default BalanceGoal;
