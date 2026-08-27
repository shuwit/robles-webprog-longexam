import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { HttpStatus } from '../config/constants.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Not authorized, user not found' });
    }

    if (req.user.isActive === false) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Account is inactive. Contact an administrator.',
      });
    }

    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }

  return res
    .status(HttpStatus.FORBIDDEN)
    .json({ message: 'Not authorized as admin' });
};
