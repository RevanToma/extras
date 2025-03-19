import { useQuery } from '@tanstack/react-query';
import { getExchangeRates } from '@/actions/currency.actions';
import { useState, useEffect } from 'react';

export const useExchangeRates = () => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedCurrency') || 'USD';
    }
    return 'USD';
  });

  const { data: exchangeRates = {}, isLoading } = useQuery<
    { [key: string]: number },
    Error
  >({
    queryKey: ['exchangeRates'],
    queryFn: async () => getExchangeRates(currency),
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', currency);
    }
  }, [currency]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', currency);
    }
  }, [currency]);

  return { currency, setCurrency, exchangeRates, isLoading };
};
