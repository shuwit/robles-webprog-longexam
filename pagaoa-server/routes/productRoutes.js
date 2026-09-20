import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(authentication, authorize('Admin'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(authentication, authorize('Admin'), updateProduct)
  .delete(authentication, authorize('Admin'), deleteProduct);

export default router;
