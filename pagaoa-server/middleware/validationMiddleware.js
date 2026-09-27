import { body, validationResult } from 'express-validator';
import { HttpStatus } from '../config/constants.js';

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

export const registerValidation = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidation,
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidation,
];

export const profileValidation = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email').optional().isEmail().withMessage('Invalid email address').normalizeEmail(),
  handleValidation,
];

export const passwordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  handleValidation,
];

export default {
  registerValidation,
  loginValidation,
  profileValidation,
  passwordValidation,
};
