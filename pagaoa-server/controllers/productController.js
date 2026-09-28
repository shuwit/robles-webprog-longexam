import Product from '../models/productModel.js';
import { HttpStatus } from '../config/constants.js';
import { listProducts, getPopulatedProduct } from '../utils/productQuery.js';
import {
  attachUploadedImage,
  removeStoredImage,
  stripImagePublicId,
} from '../utils/productImage.js';

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
    const payload = await attachUploadedImage(stripImagePublicId(req.body), req.file);
    const product = await Product.create(payload);
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
    const existing = await Product.findById(req.params.id);

    if (!existing) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
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

    res.status(HttpStatus.OK).json(product);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Image file is required' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    const uploaded = await attachUploadedImage({}, req.file, product.imagePublicId);
    product.image = uploaded.image;
    product.imagePublicId = uploaded.imagePublicId;
    await product.save();

    res.status(HttpStatus.OK).json({
      success: true,
      imageUrl: uploaded.image,
      publicId: uploaded.imagePublicId,
      product,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    await removeStoredImage(product.imagePublicId);
    await product.deleteOne();
    res.status(HttpStatus.OK).json({ message: 'Product removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
