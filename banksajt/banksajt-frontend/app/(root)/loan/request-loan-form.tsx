'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLoans } from '@/context/request-loan-context';
import { useState } from 'react';
import { toast } from 'sonner';

const RequestLoanForm = () => {
  const [amount, setAmount] = useState(''),
    [reason, setReason] = useState(''),
    { loans, requestLoan, cancelRequest } = useLoans();

  const handleSubmit = () => {
    if (!amount || !reason) return toast.error('Please fill in all fields');
    requestLoan(Number(amount), reason);
    setAmount('');
    setReason('');
  };

  return (
    <div className='flex flex-col gap-6 justify-center p-6 items-center w-full my-7'>
      <div className='w-full max-w-2xl shadow-lg rounded-lg p-6 text-center bg-muted flex flex-col gap-5'>
        <h1 className='text-3xl font-bold mb-4'>Request a Loan</h1>
        <Input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Textarea
          placeholder='Reason for loan...'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button className='mt-4 cursor-pointer' onClick={handleSubmit}>
          Request Loan
        </Button>
      </div>

      <div className='w-full max-w-2xl mt-6'>
        <h2 className='text-2xl font-semibold mb-3'>Your Loan Requests</h2>
        <ul className='bg-white p-4 rounded-lg space-y-3'>
          {loans.map((loan) => (
            <li key={loan.id} className='border p-3 rounded-md '>
              <div className='flex justify-between items-center mb-2'>
                <div className='flex flex-1 gap-2 items-center justify-between'>
                  <p className='text-lg font-medium'>💰 {loan.amount} SEK</p>

                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      loan.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : loan.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
              </div>
              <div className='flex  items-center justify-between'>
                <div className='flex items-center gap-2'>
                  📅
                  <p className='text-sm text-gray-600'>
                    {new Date(loan.date).toLocaleString()}
                  </p>
                </div>
                {loan.status === 'pending' && (
                  <Button
                    variant={'destructive'}
                    onClick={() => cancelRequest(loan.id)}
                    className=' cursor-pointer'
                    size={'sm'}
                  >
                    Cancel Request
                  </Button>
                )}
              </div>
              <span className='mt-1 font-semibold'>Your Reason:</span>
              <p>{loan.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequestLoanForm;
