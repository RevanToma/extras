import { Request, Response } from 'express';
import { users, accounts } from '../models/data';

export const createUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  const id = users.length + 1;
  users.push({ id, username, password });
  accounts.push({
    id: accounts.length + 1,
    userId: id,
    amount: 0,
    transactions: [],
  });

  res.status(201).json({ message: 'User created successfully', userId: id });
};
