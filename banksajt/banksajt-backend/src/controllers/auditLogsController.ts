import { Request, Response } from 'express';
import { getSession } from '../utils/helpers';
import { auditLogs } from '../models/data';

export const getAuditLogs = (req: Request, res: Response): void => {
  const session = getSession(req);

  if (!session) {
    res.status(401).json({ message: 'Invalid or expired session' });
    return;
  }

  const userLogs = auditLogs.filter((log) => log.userId === session.userId);
  res.json({ logs: userLogs });
};
