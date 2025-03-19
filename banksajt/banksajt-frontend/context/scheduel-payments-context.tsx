'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { makeTransaction } from '@/actions/transactions.actions';
import { toast } from 'sonner';
import { ScheduledPayment } from '@/types';
import { getUser } from '@/actions/user.actions';

interface ScheduledPaymentsContextType {
  payments: ScheduledPayment[];
  addPayment: (amount: number, date: string, time: string) => Promise<boolean>;
  removePayment: (id: string) => void;
}

const ScheduledPaymentsContext =
  createContext<ScheduledPaymentsContextType | null>(null);

export const ScheduledPaymentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);

  useEffect(() => {
    const storedPayments = JSON.parse(
      localStorage.getItem('scheduledPayments') || '[]'
    );
    setPayments(storedPayments);
  }, []);

  useEffect(() => {
    localStorage.setItem('scheduledPayments', JSON.stringify(payments));
  }, [payments]);

  const addPayment = async (amount: number, date: string, time: string) => {
    try {
      const data = await getUser();

      if (data.account.balance < amount) {
        throw new Error('Insufficient funds');
      }

      const newPayment: ScheduledPayment = {
        id: crypto.randomUUID(),
        amount,
        date,
        time,
      };

      setPayments((prev) => [...prev, newPayment]);
      toast.success(`Payment of $${amount} scheduled!`);
      return true;
    } catch (error: any) {
      toast.error(` Payment failed: ${error.message}`);
      return false;
    }
  };

  const removePayment = (id: string) => {
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
    toast.info('Scheduled payment removed.');
  };

  useEffect(() => {
    const checkPayments = () => {
      const now = new Date();
      const updatedPayments = payments.filter((payment) => {
        const paymentDateTime = new Date(`${payment.date}T${payment.time}`);

        if (now >= paymentDateTime) {
          makeTransaction(payment.amount, 'withdraw')
            .then(() =>
              toast.success(`💸 Payment of $${payment.amount} processed!`)
            )
            .catch((error) =>
              toast.error(`❌ Payment failed: ${error.message}`)
            );

          return false;
        }
        return true;
      });

      if (updatedPayments.length !== payments.length) {
        setPayments(updatedPayments);
      }
    };

    checkPayments();
    const interval = setInterval(checkPayments, 60 * 1000);

    return () => clearInterval(interval);
  }, [payments]);

  return (
    <ScheduledPaymentsContext.Provider
      value={{ payments, addPayment, removePayment }}
    >
      {children}
    </ScheduledPaymentsContext.Provider>
  );
};

export const useScheduledPayments = () => {
  const context = useContext(ScheduledPaymentsContext);
  if (!context)
    throw new Error(
      'useScheduledPayments must be used within ScheduledPaymentsProvider'
    );
  return context;
};
