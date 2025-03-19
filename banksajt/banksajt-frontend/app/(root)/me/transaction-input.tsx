import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { makeTransaction } from '@/actions/transactions.actions';
import { useExchangeRates } from '@/hooks/useExchangeRates';

const TransactionInput = () => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { currency, convertAmount } = useExchangeRates();

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
      const convertedAmount =
        amt / (currency === 'USD' ? 1 : convertAmount(1, currency));

      await transactionMutation.mutateAsync({ amount: convertedAmount, type });

      setAmount('');
    } catch (error: any) {
      alert(error.message || 'Transaction failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 justify-center mt-6'>
      <Input
        type='number'
        placeholder='Enter amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className='sm:w-full md:w-2/3'
      />
      <Button onClick={() => handleTransaction('deposit')} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Deposit'}
      </Button>
      <Button
        onClick={() => handleTransaction('withdraw')}
        variant='destructive'
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Withdraw'}
      </Button>
    </div>
  );
};

export default TransactionInput;
