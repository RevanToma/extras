import { Request, Response } from 'express';

import { prisma } from '../db/prisma.js';

export const getAuditLogs = async (
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

    const userLogs = await prisma.auditLogs.findMany({
      where: { userId: session.user.id },
    });

    res.json({ logs: userLogs });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
