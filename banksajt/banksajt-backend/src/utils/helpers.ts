import { Request } from 'express';
import { prisma } from '../db/prisma.js';

export const getSession = async (req: Request, includeAccounts = false) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return null;
  }

  const sessionQuery = {
    where: { token },
    include: {
      user: includeAccounts ? { include: { accounts: true } } : true,
    },
  };

  return await prisma.session.findUnique(sessionQuery);
};

export const logAction = async (
  userId: string,
  action: string
): Promise<void> => {
  await prisma.auditLogs.create({
    data: {
      userId,
      action,
    },
  });
  console.log(`Audit Log: User ${userId} - ${action}`);
};
