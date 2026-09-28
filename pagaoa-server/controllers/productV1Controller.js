import Product from '../models/productModel.js';
import { HttpStatus } from '../config/constants.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { listProducts, getPopulatedProduct } from '../utils/productQuery.js';
import {
  attachUploadedImage,
  removeStoredImage,
  stripImagePublicId,
} from '../utils/productImage.js';

export const getProductsV1 = async (req, res) => {
  try {
    const { products, page, limit, total, pages } = await listProducts(req.query);

    return sendSuccess(res, {
      message: 'Products retrieved successfully.',
      data: products,
      extra: { page, limit, total, pages },
    });
  } catch (error) {
    return sendError(res, { message: error.message });
  }
};

export const getProductByIdV1 = async (req, res) => {
  try {
    const product = await getPopulatedProduct(req.params.id);

    if (!product) {
      return sendError(res, {
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return sendSuccess(res, {
      message: 'Product retrieved successfully.',
      data: product,
    });
  } catch (error) {
    return sendError(res, { message: error.message });
  }
};

export const createProductV1 = async (req, res) => {
  try {
    const payload = await attachUploadedImage(stripImagePublicId(req.body), req.file);
    const product = await Product.create(payload);
    return sendSuccess(res, {
      status: HttpStatus.CREATED,
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    return sendError(res, { status, message: error.message });
  }
};

export const updateProductV1 = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);

    if (!existing) {
      return sendError(res, {
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    const payload = await attachUploadedImage(
      stripImagePublicId(req.body),
      req.file,
      existing.imagePublicId
    );
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, {
      message: 'Product updated successfully.',
      data: product,
    });
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    return sendError(res, { status, message: error.message });
  }
};

export const deleteProductV1 = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendError(res, {
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    await removeStoredImage(product.imagePublicId);
    await product.deleteOne();

    return sendSuccess(res, {
      message: 'Product deleted successfully.',
      data: product,
    });
  } catch (error) {
    return sendError(res, { message: error.message });
  }
};
