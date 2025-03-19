import React from 'react';
import ScheduledPage from './scheduled-payments';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scheduled Payments',
};

const ScheduledPaymentsPage = () => {
  return <ScheduledPage />;
};

export default ScheduledPaymentsPage;
