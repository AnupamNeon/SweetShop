import express from 'express';
import {
  createSweet,
  getAllSweets,
  getSweetById,
  searchSweets,
  updateSweet,
  deleteSweet
} from '../controllers/sweetController.js';
import {
  sweetValidation,
  sweetUpdateValidation,
  searchValidation,
  objectIdValidation
} from '../validators/validators.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/sweets/search
router.get('/search', searchValidation, searchSweets);

// @route   POST /api/sweets
router.post('/', sweetValidation, createSweet);

// @route   GET /api/sweets
router.get('/', getAllSweets);

// @route   GET /api/sweets/:id
router.get('/:id', objectIdValidation, getSweetById);

// @route   PUT /api/sweets/:id
router.put('/:id', objectIdValidation, sweetUpdateValidation, updateSweet);

// @route   DELETE /api/sweets/:id (Admin only)
router.delete('/:id', objectIdValidation, adminOnly, deleteSweet);

export default router;