import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/validators.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerValidation, register);

// @route   POST /api/auth/login
router.post('/login', loginValidation, login);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

// @route   GET /api/auth/logout
router.post('/logout', protect, logout);

export default router;