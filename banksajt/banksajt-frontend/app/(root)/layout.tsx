import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=' h-screen'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
