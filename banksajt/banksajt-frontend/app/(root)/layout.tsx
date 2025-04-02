import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { RequestLoanProvidor } from '@/context/request-loan-context';
import { ScheduledPaymentsProvider } from '@/context/scheduel-payments-context';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-screen flex  flex-col justify-between'>
      <Navbar />
      <RequestLoanProvidor>
        <ScheduledPaymentsProvider>{children}</ScheduledPaymentsProvider>
      </RequestLoanProvidor>
      <Footer />
    </main>
  );
}
