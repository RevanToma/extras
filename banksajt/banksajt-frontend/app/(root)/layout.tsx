import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { ScheduledPaymentsProvider } from '@/context/scheduel-payments-context';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-screen flex flex-col justify-between'>
      <Navbar />
      <ScheduledPaymentsProvider>{children}</ScheduledPaymentsProvider>
      <Footer />
    </main>
  );
}
