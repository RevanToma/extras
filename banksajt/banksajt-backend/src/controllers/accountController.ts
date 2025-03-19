import { Request, Response } from 'express';

import { prisma } from '../db/prisma.js';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: { include: { accounts: true } } },
    });

    if (!session || !session.user) {
      res.status(401).json({ message: 'Invalid or expired session' });
      return;
    }

    const account =
      session.user.accounts.length > 0 ? session.user.accounts[0] : null;

    res.json({
      user: {
        id: session.user.id,
        username: session.user.username,
        account,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const handleTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, type } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || !amount || amount <= 0) {
    res.status(400).json({ message: 'Invalid request' });
    return;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      res.status(401).json({ message: 'Invalid or expired session' });
      return;
    }

    const account = await prisma.account.findFirst({
      where: { userId: session.user.id },
    });

    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }

    let newBalance = account.balance;

    if (type === 'deposit') {
      newBalance += amount;
    } else if (type === 'withdraw') {
      if (account.balance < amount) {
        res.status(400).json({ message: 'Insufficient funds' });
        return;
      }
      newBalance -= amount;
    } else {
      res.status(400).json({ message: 'Invalid transaction type' });
      return;
    }

    const updatedAccount = await prisma.account.update({
      where: { id: account.id },
      data: {
        balance: newBalance,
        transactions: {
          create: {
            amount,
            type,
          },
        },
      },
      include: { transactions: true },
    });

    await prisma.auditLogs.create({
      data: {
        userId: session.user.id,
        action: `${type === 'deposit' ? 'Deposited' : 'Withdrew'} ${amount}$`,
      },
    });

    res.json({
      message: 'Transaction successful',
      balance: updatedAccount.balance,
      transaction:
        updatedAccount.transactions[updatedAccount.transactions.length - 1],
    });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const transactionHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Missing or invalid session token' });
    return;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      res.status(401).json({ message: 'Invalid or expired session' });
      return;
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        account: { userId: session.user.id },
      },
      orderBy: { date: 'desc' },
    });

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
