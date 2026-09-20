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

const router = express.Router();

router.post('/signup', registerUser);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/signin', authUser);

router.get('/profile', authentication, getProfile);
router.put('/profile', authentication, updateProfile);
router.put('/profile/password', authentication, changePassword);

router.get('/', authentication, authorize('Admin'), getUsers);
router.get('/:id', authentication, authorize('Admin'), getUserById);
router.put('/:id', authentication, updateUser);
router.patch('/update/:id', authentication, updateUser);
router.delete('/:id', authentication, authorize('Admin'), deleteUser);
router.delete('/remove/:id', authentication, authorize('Admin'), deleteUser);

export default router;
