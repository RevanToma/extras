export type BankAction = 'deposit' | 'withdraw';

export type TransactionHistory = {
  id: number;
  accountId: number;
  type: BankAction;
  amount: number;
  date: string;
};
