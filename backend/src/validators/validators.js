import { body, query, param } from 'express-validator';

// User registration validation
export const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// User login validation
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Sweet validation
export const sweetValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Sweet name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['mithai', 'milk-sweets', 'laddoo', 'halwa', 'barfi', 'chocolate', 'bakery', 'namkeen', 'ice-cream', 'dry-fruit', 'other'])
    .withMessage('Invalid category'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

// Sweet update validation
export const sweetUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('category')
    .optional()
    .trim()
    .isIn(['mithai', 'milk-sweets', 'laddoo', 'halwa', 'barfi', 'chocolate', 'bakery', 'namkeen', 'ice-cream', 'dry-fruit', 'other'])
    .withMessage('Invalid category'),
  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

// Search validation
export const searchValidation = [
  query('name').optional().trim().escape(),
  query('category')
    .optional()
    .trim()
    .isIn(['mithai', 'milk-sweets', 'laddoo', 'halwa', 'barfi', 'chocolate', 'bakery', 'namkeen', 'ice-cream', 'dry-fruit', 'other'])
    .withMessage('Invalid category'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Min price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Max price must be a positive number')
];

// Purchase validation
export const purchaseValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

// Restock validation
export const restockValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1')
];

// MongoDB ObjectId validation
export const objectIdValidation = [
  param('id').isMongoId().withMessage('Invalid ID format')
];