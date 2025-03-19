'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useScheduledPayments } from '@/context/scheduel-payments-context';
import { toast } from 'sonner';

const ScheduledPage = () => {
  const { payments, addPayment, removePayment } = useScheduledPayments(),
    [amount, setAmount] = useState(''),
    [date, setDate] = useState(''),
    [time, setTime] = useState('');

  const handleSchedulePayment = async () => {
    if (!amount || !date || !time) {
      toast('Please enter a valid amount, date, and time.');
      return;
    }
    const success = await addPayment(parseFloat(amount), date, time);

    if (success) {
      setAmount('');
      setDate('');
      setTime('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='flex flex-col items-center p-6 '
    >
      <h1 className='text-3xl font-bold mb-6'>Scheduled Payments</h1>

      <div className='w-full max-w-md p-6 bg-muted rounded-lg shadow-lg flex flex-col gap-4'>
        <h2 className='text-lg font-semibold mb-3'>Schedule a Payment</h2>
        <Input
          type='number'
          placeholder='Enter amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className=' shadow-sm'
        />
        <Input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=' shadow-sm'
        />
        <Input
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='shadow-sm'
        />

        <Button
          onClick={handleSchedulePayment}
          className='w-full cursor-pointer'
        >
          Schedule Payment
        </Button>
      </div>

      {payments.length > 0 && (
        <div className='w-full max-w-md mt-6 p-4 bg-muted rounded-lg shadow-lg'>
          <h2 className='text-lg font-semibold mb-3'>Upcoming Payments</h2>
          <ul className='space-y-3'>
            {payments.map((payment) => (
              <li
                key={payment.id}
                className='flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm'
              >
                <div>
                  <p className='text-primary font-bold'>${payment.amount}</p>
                  <p className='text-sm text-muted-foreground'>
                    {format(new Date(payment.date), 'PPP')} at {payment.time}
                  </p>
                </div>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={() => removePayment(payment.id)}
                  className='cursor-pointer'
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default ScheduledPage;
