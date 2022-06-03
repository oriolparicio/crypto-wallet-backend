import { Router } from 'express';

// Controller
import {
  getUserTransactions,
  postTransaction,
} from '../controller/transactionsController.js';

const router = Router();

// Transactions
router.get('/:id', getUserTransactions);
router.post('/', postTransaction);

export default router;
