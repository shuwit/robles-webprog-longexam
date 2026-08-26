import express from 'express';
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getOrders).post(protect, createOrder);
router.get('/user/:userId', getOrdersByUser);
router
  .route('/:id')
  .get(getOrderById)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder);

export default router;
