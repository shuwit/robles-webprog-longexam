import express from 'express';
import { getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/myorders', getMyOrders);

export default router;
