'use client';
import { PortfolioProvider } from '@/context/PortfolioContext';
import React from 'react';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <PortfolioProvider>{children}</PortfolioProvider>;
};

export default ClientProvider;
