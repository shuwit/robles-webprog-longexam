import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(authentication, authorize('Admin'), createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(authentication, authorize('Admin'), updateCategory)
  .delete(authentication, authorize('Admin'), deleteCategory);

export default router;
