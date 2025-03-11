import { Request, Response } from 'express';
import { accounts, sessions } from '../models/data';

export const getUser = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1],
    session = sessions.find((s) => s.token === token);

  if (!session) {
    res.status(401).json({ message: 'Invalid or expired session' });
    return;
  }

  const account = accounts.find((acc) => acc.userId === session.userId);
  res.json({ account });
  return;
};
export const handleTransaction = (req: Request, res: Response): void => {
  const { token, amount, type } = req.body; // ✅ Expect type in request

  if (!amount || amount <= 0) {
    res.status(400).json({ message: 'Invalid amount' });
    return;
  }

  const session = sessions.find((s) => s.token === token);

  if (!session) {
    res.status(401).json({ message: 'Invalid or expired session' });
    return;
  }

  const account = accounts.find((acc) => acc.userId === session.userId);

  if (account) {
    if (type === 'deposit') {
      account.amount += amount;
    } else if (type === 'withdraw') {
      if (account.amount < amount) {
        res.status(400).json({ message: 'Insufficient funds' });
        return;
      }
      account.amount -= amount;
    } else {
      res.status(400).json({ message: 'Invalid transaction type' });
      return;
    }

    const transaction = {
      id: account.transactions.length + 1,
      accountId: account.id,
      type,
      amount,
      date: new Date().toISOString(),
    };
    account.transactions.push(transaction);

    res.json({
      message: 'Transaction successful',
      balance: account.amount,
      transaction,
    });
    return;
  }

  res.status(404).json({ message: 'Account not found' });
};

export const transactionHistory = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1],
    session = sessions.find((s) => s.token === token);

  if (!session) {
    res.status(401).json({ message: 'Invalid or expired session' });
    return;
  }

  const account = accounts.find((acc) => acc.userId === session.userId);

  if (account) {
    res.json({ transactions: account.transactions });
    return;
  }

  res.status(404).json({ message: 'Account not found' });
};
