import express from 'express';
import {
  getProductsV1,
  getProductByIdV1,
  createProductV1,
  updateProductV1,
  deleteProductV1,
} from '../controllers/productV1Controller.js';

const router = express.Router();

router.route('/').get(getProductsV1).post(createProductV1);
router
  .route('/:id')
  .get(getProductByIdV1)
  .put(updateProductV1)
  .delete(deleteProductV1);

export default router;
