import express from 'express';
import {
  getCarts,
  getCartByUser,
  addToCart,
  updateCartItem,
  deleteCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCarts).post(protect, addToCart);
router
  .route('/:userId')
  .get(protect, getCartByUser)
  .put(protect, updateCartItem)
  .delete(protect, deleteCart);

export default router;
