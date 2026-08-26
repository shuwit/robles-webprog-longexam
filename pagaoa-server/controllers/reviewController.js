import Review from '../models/reviewModel.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
