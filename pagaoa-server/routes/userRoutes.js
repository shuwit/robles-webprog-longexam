import express from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  authUser,
  getProfile,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/signin', authUser);
router.get('/profile', protect, getProfile);
router
  .route('/:id')
  .get(getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
