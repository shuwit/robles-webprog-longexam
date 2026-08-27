import express from 'express';
import {
  getOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  confirmOrder,
  markOrderReady,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getOrders).post(protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.put('/:id/confirm', protect, admin, confirmOrder);
router.put('/:id/ready', protect, admin, markOrderReady);
router
  .route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

export default router;
