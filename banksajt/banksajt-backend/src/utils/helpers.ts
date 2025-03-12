import { Request } from 'express';
import { auditLogs, sessions } from '../models/data';

export const getSession = (req: Request): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  return sessions.find((s) => s.token === token);
};

export const logAction = (userId: number, action: string): void => {
  auditLogs.push({
    userId,
    action,
    date: new Date().toISOString(),
  });
  console.log(`Audit Log: User ${userId} - ${action}`);
};
