'use client';

import { Loan } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface RequestLoanContextType {
  loans: Loan[];
  requestLoan: (amount: number, reason: string) => void;
  cancelRequest: (id: string) => void;
  isLoading: boolean;
}

const RequestLoanContext = createContext<RequestLoanContextType | undefined>(
  undefined
);

export const RequestLoanProvidor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loans, setLoans] = useState<Loan[]>([]),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLoans = localStorage.getItem('loans');
    if (storedLoans) {
      try {
        setLoans(JSON.parse(storedLoans));
      } catch {
        setLoans([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('loans', JSON.stringify(loans));
    }
  }, [loans, isLoading]);

  const requestLoan = (amount: number, reason: string) => {
    const newLoan: Loan = {
      id: crypto.randomUUID(),
      amount,
      reason,
      status: 'pending',
      date: new Date().toISOString(),
    };

    setLoans((prev) => [newLoan, ...prev]);
  };

  const cancelRequest = (id: string) => {
    setLoans((prev) => prev.filter((loan) => loan.id !== id));
  };

  return (
    <RequestLoanContext.Provider
      value={{ loans, requestLoan, isLoading, cancelRequest }}
    >
      {children}
    </RequestLoanContext.Provider>
  );
};

export const useLoans = () => {
  const context = useContext(RequestLoanContext);
  if (!context) throw new Error('useLoans must be used within LoanProvider');
  return context;
};
