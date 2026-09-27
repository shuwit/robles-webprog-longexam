import rateLimit from 'express-rate-limit';
import { HttpStatus } from '../config/constants.js';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many registration attempts. Please try again after 15 minutes.',
  },
});

const failedLogins = new Map();

const getLockMinutes = (count) => {
  if (count >= 10) return 30;
  if (count >= 8) return 5;
  if (count >= 5) return 3;
  return 0;
};

export const progressiveLoginGuard = (req, res, next) => {
  const key = String(req.body.email || req.ip || 'unknown').toLowerCase();
  const record = failedLogins.get(key);

  if (record?.lockedUntil && Date.now() < record.lockedUntil) {
    const waitMs = record.lockedUntil - Date.now();
    const waitMinutes = Math.max(1, Math.ceil(waitMs / 60000));
    return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      message: `Too many failed logins (${record.count}x). Try again in ${waitMinutes} minute(s).`,
      failedAttempts: record.count,
      lockMinutes: getLockMinutes(record.count),
    });
  }

  next();
};

export const recordFailedLogin = (email) => {
  const key = String(email || 'unknown').toLowerCase();
  const current = failedLogins.get(key) || { count: 0, lockedUntil: null };
  current.count += 1;

  const lockMinutes = getLockMinutes(current.count);
  current.lockedUntil = lockMinutes
    ? Date.now() + lockMinutes * 60 * 1000
    : null;

  failedLogins.set(key, current);
  return current;
};

export const clearFailedLogins = (email) => {
  const key = String(email || 'unknown').toLowerCase();
  failedLogins.delete(key);
};

export default {
  loginLimiter,
  registerLimiter,
  progressiveLoginGuard,
  recordFailedLogin,
  clearFailedLogins,
};
