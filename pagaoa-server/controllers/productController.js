import Product from '../models/productModel.js';
import { HttpStatus } from '../config/constants.js';
import { listProducts, getPopulatedProduct } from '../utils/productQuery.js';

export const getProducts = async (req, res) => {
  try {
    const result = await listProducts(req.query);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getPopulatedProduct(req.params.id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    res.status(HttpStatus.OK).json(product);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(HttpStatus.CREATED).json(product);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    res.status(HttpStatus.OK).json(product);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Product removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
