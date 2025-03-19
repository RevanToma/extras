import { Request, Response } from 'express';

import { prisma } from '../db/prisma.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCount = await prisma.user.count();
    res.json({ users: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userExists) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        accounts: {
          create: [
            {
              balance: 0,
            },
          ],
        },
      },
      include: {
        accounts: true,
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
