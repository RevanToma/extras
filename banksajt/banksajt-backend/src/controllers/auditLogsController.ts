import { Request, Response } from 'express';

import { prisma } from '../db/prisma.js';
import { getSession } from '../utils/helpers.js';

export const getAuditLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await getSession(req);

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
