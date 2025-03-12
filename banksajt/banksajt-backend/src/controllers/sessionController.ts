import { Request, Response } from 'express';
import crypto from 'crypto';
import { users, sessions } from '../models/data';
import { logAction } from '../utils/helpers';

export const loginUser = (req: Request, res: Response): void => {
  const { username, password } = req.body,
    user = users.find(
      (u) => u.username === username && u.password === password
    );

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = crypto.randomBytes(16).toString('hex');
  sessions.push({ userId: user.id, token });

  logAction(user.id, 'Logged in');

  res.json({ token });
};
