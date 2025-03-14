export type BankAction = 'deposit' | 'withdraw';

export type TransactionHistory = {
  id: number;
  accountId: number;
  type: BankAction;
  amount: number;
  date: string;
};

export type AuditLogs = {
  userId: number;
  action: string;
  date: string;
};
