import express from 'express';
import {
  getReviews,
  getReviewById,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getReviews).post(protect, createReview);
router.get('/product/:productId', getReviewsByProduct);
router
  .route('/:id')
  .get(getReviewById)
  .put(protect, admin, updateReview)
  .delete(protect, admin, deleteReview);

export default router;
