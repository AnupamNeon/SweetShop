import { validationResult } from 'express-validator';
import Sweet from '../models/Sweet.js';

// @desc    Purchase a sweet (decrease quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Private
export const purchaseSweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { quantity } = req.body;
    const purchaseQuantity = parseInt(quantity);

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    // Check if enough stock is available
    if (sweet.quantity < purchaseQuantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${sweet.quantity} units available.`
      });
    }

    // Decrease quantity
    sweet.quantity -= purchaseQuantity;
    await sweet.save();

    // Calculate total price
    const totalPrice = sweet.price * purchaseQuantity;

    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      data: {
        sweet: {
          _id: sweet._id,
          name: sweet.name,
          category: sweet.category,
          price: sweet.price,
          remainingQuantity: sweet.quantity
        },
        purchase: {
          quantity: purchaseQuantity,
          totalPrice: parseFloat(totalPrice.toFixed(2))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Restock a sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Private (Admin only)
export const restockSweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { quantity } = req.body;
    const restockQuantity = parseInt(quantity);

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    // Increase quantity
    const previousQuantity = sweet.quantity;
    sweet.quantity += restockQuantity;
    await sweet.save();

    res.status(200).json({
      success: true,
      message: 'Restock successful',
      data: {
        sweet: {
          _id: sweet._id,
          name: sweet.name,
          category: sweet.category,
          price: sweet.price,
          previousQuantity,
          addedQuantity: restockQuantity,
          newQuantity: sweet.quantity
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory status (low stock items)
// @route   GET /api/inventory/low-stock
// @access  Private (Admin only)
export const getLowStock = async (req, res, next) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;

    const lowStockSweets = await Sweet.find({ quantity: { $lte: threshold } })
      .populate('createdBy', 'username')
      .sort({ quantity: 1 });

    res.status(200).json({
      success: true,
      count: lowStockSweets.length,
      threshold,
      data: lowStockSweets
    });
  } catch (error) {
    next(error);
  }
};