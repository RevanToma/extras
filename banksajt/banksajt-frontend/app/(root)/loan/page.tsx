import { Metadata } from 'next';

import RequestLoanForm from './request-loan-form';

export const metadata: Metadata = {
  title: 'Request a Loan',
};

const LoanPage = () => {
  return <RequestLoanForm />;
};

export default LoanPage;
