import express from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  authUser,
  getProfile,
  updateProfile,
  changePassword,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';
import {
  registerValidation,
  loginValidation,
  profileValidation,
  passwordValidation,
} from '../middleware/validationMiddleware.js';
import {
  loginLimiter,
  registerLimiter,
  progressiveLoginGuard,
} from '../middleware/rateLimiterMiddleware.js';

const router = express.Router();

router.post('/signup', registerLimiter, registerValidation, registerUser);
router.post('/register', registerLimiter, registerValidation, registerUser);
router.post('/login', loginLimiter, loginValidation, progressiveLoginGuard, authUser);
router.post('/signin', loginLimiter, loginValidation, progressiveLoginGuard, authUser);

router.get('/profile', authentication, getProfile);
router.put('/profile', authentication, profileValidation, updateProfile);
router.put('/profile/password', authentication, passwordValidation, changePassword);

router.get('/', authentication, authorize('Admin'), getUsers);
router.get('/:id', authentication, authorize('Admin'), getUserById);
router.put('/:id', authentication, profileValidation, updateUser);
router.patch('/update/:id', authentication, profileValidation, updateUser);
router.delete('/:id', authentication, authorize('Admin'), deleteUser);
router.delete('/remove/:id', authentication, authorize('Admin'), deleteUser);

export default router;
