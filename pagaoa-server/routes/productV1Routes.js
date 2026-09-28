import express from 'express';
import {
  getProductsV1,
  getProductByIdV1,
  createProductV1,
  updateProductV1,
  deleteProductV1,
} from '../controllers/productV1Controller.js';
import { uploadProductImage } from '../controllers/productController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';
import { uploadProductImageFile } from '../middleware/uploadImageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProductsV1)
  .post(authentication, authorize('Admin'), uploadProductImageFile, createProductV1);

router.post(
  '/:id/upload-image',
  authentication,
  authorize('Admin'),
  uploadProductImageFile,
  uploadProductImage
);

router
  .route('/:id')
  .get(getProductByIdV1)
  .put(authentication, authorize('Admin'), uploadProductImageFile, updateProductV1)
  .delete(authentication, authorize('Admin'), deleteProductV1);

export default router;
