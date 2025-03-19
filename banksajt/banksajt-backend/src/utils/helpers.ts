import { Request } from 'express';
import { prisma } from '../db/prisma.js';
export const getSession = async (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return null;
  }

  return await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
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
