import { validationResult } from 'express-validator';
import Sweet from '../models/Sweet.js';

// @desc    Create a new sweet
// @route   POST /api/sweets
// @access  Private
export const createSweet = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, category, price, quantity, description } = req.body;

    // Check if sweet with same name exists
    const existingSweet = await Sweet.findOne({ name: name.toLowerCase() });
    if (existingSweet) {
      return res.status(400).json({
        success: false,
        message: 'A sweet with this name already exists'
      });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity: quantity || 0,
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Sweet created successfully',
      data: sweet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Private
export const getAllSweets = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sweets = await Sweet.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Sweet.countDocuments();

    res.status(200).json({
      success: true,
      count: sweets.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: sweets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single sweet by ID
// @route   GET /api/sweets/:id
// @access  Private
export const getSweetById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const sweet = await Sweet.findById(req.params.id).populate(
      'createdBy',
      'username'
    );

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search sweets by name, category, or price range
// @route   GET /api/sweets/search
// @access  Private
export const searchSweets = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    // Search by name (case-insensitive partial match)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    const sweets = await Sweet.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private
export const updateSweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    // Check if trying to update name to an existing name
    if (req.body.name && req.body.name !== sweet.name) {
      const existingSweet = await Sweet.findOne({ name: req.body.name });
      if (existingSweet) {
        return res.status(400).json({
          success: false,
          message: 'A sweet with this name already exists'
        });
      }
    }

    // Update the sweet
    sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');

    res.status(200).json({
      success: true,
      message: 'Sweet updated successfully',
      data: sweet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private (Admin only)
export const deleteSweet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }

    await Sweet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};