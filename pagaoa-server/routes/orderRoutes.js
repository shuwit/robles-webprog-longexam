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
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(authentication, authorize('Admin'), getOrders)
  .post(authentication, createOrder);

router.get('/mine', authentication, getMyOrders);
router.put('/:id/confirm', authentication, authorize('Admin'), confirmOrder);
router.put('/:id/ready', authentication, authorize('Admin'), markOrderReady);

router
  .route('/:id')
  .get(authentication, getOrderById)
  .put(authentication, authorize('Admin'), updateOrder)
  .delete(authentication, authorize('Admin'), deleteOrder);

export default router;
