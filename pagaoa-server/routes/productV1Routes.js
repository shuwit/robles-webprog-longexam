import express from 'express';
import {
  getProductsV1,
  getProductByIdV1,
  createProductV1,
  updateProductV1,
  deleteProductV1,
} from '../controllers/productV1Controller.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(getProductsV1)
  .post(authentication, authorize('Admin'), createProductV1);

router
  .route('/:id')
  .get(getProductByIdV1)
  .put(authentication, authorize('Admin'), updateProductV1)
  .delete(authentication, authorize('Admin'), deleteProductV1);

export default router;
