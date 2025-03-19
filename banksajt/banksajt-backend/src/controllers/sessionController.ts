import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../db/prisma.js';
import { logAction } from '../utils/helpers.js';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = crypto.randomBytes(16).toString('hex');

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
      },
    });

    logAction(user.id, 'Logged in');

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
