import { HttpStatus } from '../config/constants.js';

export const notFound = (req, res, next) => {
  res.status(HttpStatus.NOT_FOUND).json({
    message: `Route not found - ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  const status =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default errorHandler;
