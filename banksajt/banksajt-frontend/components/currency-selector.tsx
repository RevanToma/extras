'use client';
import { useEffect, useState } from 'react';
import { getExchangeRates } from '@/actions/currency.actions';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Loader } from 'lucide-react';

const CurrencySelector = ({ baseAmount }: { baseAmount: number }) => {
  const [currency, setCurrency] = useState(''),
    [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({}),
    [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await getExchangeRates();
      if (rates) {
        setExchangeRates(rates);
        setCurrencies(Object.keys(rates));
      }
    };

    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) setCurrency(storedCurrency);
    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertedAmount = exchangeRates[currency]
    ? (baseAmount * exchangeRates[currency]).toFixed(2)
    : baseAmount.toFixed(2);

  return (
    <div className='flex gap-3 items-start  flex-col sm:items-center lg:flex-row  md:flex-row'>
      {currencies.length > 0 ? (
        <Select value={currency} onValueChange={(value) => setCurrency(value)}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Select currency' />
          </SelectTrigger>
          <SelectContent className='h-60'>
            {currencies.map((cur) => (
              <SelectItem key={cur} value={cur}>
                {cur}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Loader className='animate-spin' />
      )}

      <p className='text-xl font-bold  text-green-600'>
        {convertedAmount} {currency}
      </p>
    </div>
  );
};

export default CurrencySelector;
