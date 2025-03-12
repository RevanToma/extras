import express from 'express';
import {
  getUser,
  handleTransaction,
  transactionHistory,
} from '../controllers/accountController';
import { getAuditLogs } from '../controllers/auditLogsController';

const router = express.Router();

router.post('/', getUser);
router.post('/transactions', handleTransaction);
router.get('/transactions', transactionHistory);
router.get('/audit-logs', getAuditLogs);

export default router;
