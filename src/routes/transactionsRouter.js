import { Router } from 'express';

// Controller
import {
  getUserTransactions,
  postTransaction,
} from '../controller/transactionsController.js';
import { protect } from '../controller/authController.js';

const router = Router();

// Transactions
router.get('/:id', protect, getUserTransactions);
router.post('/', protect, postTransaction);

export default router;
