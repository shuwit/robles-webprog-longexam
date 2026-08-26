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

router.route('/').get(getCarts).post(protect, addToCart);
router
  .route('/:userId')
  .get(getCartByUser)
  .put(protect, updateCartItem)
  .delete(protect, deleteCart);

export default router;
