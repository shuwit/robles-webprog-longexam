import express from 'express';
import {
  getReviews,
  getReviewById,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router.route('/').get(getReviews).post(authentication, createReview);
router.get('/product/:productId', getReviewsByProduct);

router
  .route('/:id')
  .get(getReviewById)
  .put(authentication, authorize('Admin'), updateReview)
  .delete(authentication, authorize('Admin'), deleteReview);

export default router;
