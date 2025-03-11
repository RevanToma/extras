import express from 'express';
import {
  getUser,
  handleTransaction,
  transactionHistory,
} from '../controllers/accountController';

const router = express.Router();

router.post('/', getUser);
router.post('/transactions', handleTransaction);
router.get('/transactions', transactionHistory);

export default router;
