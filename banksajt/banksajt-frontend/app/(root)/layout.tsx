import Navbar from '@/components/navbar';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex-1 wrapper'>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
