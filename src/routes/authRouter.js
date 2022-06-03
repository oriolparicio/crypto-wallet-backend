import { Router } from 'express';

// Controller
import { login } from '../controller/authController.js';

const router = Router();

// Login
router.post('/signin', login);

export default router;
