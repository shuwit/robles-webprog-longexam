import express from 'express';
import {
  getCarts,
  getCartByUser,
  addToCart,
  updateCartItem,
  removeCartItem,
  deleteCart,
} from '../controllers/cartController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(authentication, authorize('Admin'), getCarts)
  .post(authentication, addToCart);

router.delete('/:userId/items/:productId', authentication, removeCartItem);

router
  .route('/:userId')
  .get(authentication, getCartByUser)
  .put(authentication, updateCartItem)
  .delete(authentication, deleteCart);

export default router;
