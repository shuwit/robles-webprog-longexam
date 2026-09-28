import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../controllers/productController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';
import { uploadProductImageFile } from '../middleware/uploadImageMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(authentication, authorize('Admin'), uploadProductImageFile, createProduct);

router.post(
  '/:id/upload-image',
  authentication,
  authorize('Admin'),
  uploadProductImageFile,
  uploadProductImage
);

router
  .route('/:id')
  .get(getProductById)
  .put(authentication, authorize('Admin'), uploadProductImageFile, updateProduct)
  .delete(authentication, authorize('Admin'), deleteProduct);

export default router;
