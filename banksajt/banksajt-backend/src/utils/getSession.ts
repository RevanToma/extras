import { Request } from 'express';
import { sessions } from '../models/data';

export const getSession = (req: Request): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  return sessions.find((s) => s.token === token);
};
