export type AuditLogs = {
  userId: number;
  action: string;
  date: string;
};

export type Transaction = {
  id: number;
  accountId: number;
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
};

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Account {
  id: number;
  userId: number;
  amount: number;
  transactions: Transaction[];
}

export interface Session {
  userId: number;
  token: string;
}
