import Review from '../models/reviewModel.js';
import { HttpStatus } from '../config/constants.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'name')
      .populate('product', 'name');
    res.status(HttpStatus.OK).json(reviews);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name')
      .populate('product', 'name');

    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json(review);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate(
      'user',
      'name'
    );
    res.status(HttpStatus.OK).json(reviews);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  const { product, rating, comment } = req.body;

  try {
    if (!product || !rating || !comment) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Product, rating, and comment are required',
      });
    }

    const review = await Review.create({
      user: req.user._id,
      name: req.user.name,
      product,
      rating,
      comment,
    });
    res.status(HttpStatus.CREATED).json(review);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json(review);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Review not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Review removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
