import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', authUser);

export default router;
