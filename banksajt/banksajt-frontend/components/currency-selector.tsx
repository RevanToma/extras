'use client';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Loader } from 'lucide-react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { formatCurrency } from '@/lib/utils';

const CurrencySelector = ({ baseAmount }: { baseAmount: number }) => {
  const { currency, setCurrency, exchangeRates, isLoading } =
    useExchangeRates();

  const convertedAmount =
    exchangeRates && currency in exchangeRates
      ? formatCurrency(baseAmount * exchangeRates[currency], currency)
      : formatCurrency(baseAmount, currency);

  return (
    <div className='flex gap-3 items-start flex-col sm:items-center lg:flex-row md:flex-row'>
      {isLoading ? (
        <Loader className='animate-spin' />
      ) : (
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Select currency' />
          </SelectTrigger>
          <SelectContent className='h-60'>
            {Object.keys(exchangeRates).map((cur) => (
              <SelectItem key={cur} value={cur}>
                {cur}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <p className='text-xl font-bold  text-green-600'>
        {convertedAmount} {currency}
      </p>
    </div>
  );
};

export default CurrencySelector;
