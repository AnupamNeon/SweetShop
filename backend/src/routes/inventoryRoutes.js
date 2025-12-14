import express from 'express';
import {
  purchaseSweet,
  restockSweet,
  getLowStock
} from '../controllers/inventoryController.js';
import {
  purchaseValidation,
  restockValidation,
  objectIdValidation
} from '../validators/validators.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/inventory/low-stock (Admin only)
router.get('/low-stock', adminOnly, getLowStock);

// @route   POST /api/sweets/:id/purchase
router.post('/:id/purchase', objectIdValidation, purchaseValidation, purchaseSweet);

// @route   POST /api/sweets/:id/restock (Admin only)
router.post('/:id/restock', objectIdValidation, restockValidation, adminOnly, restockSweet);

export default router;