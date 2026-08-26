import Category from '../models/categoryModel.js';
import { HttpStatus } from '../config/constants.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(HttpStatus.OK).json(categories);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json(category);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(HttpStatus.CREATED).json(category);
  } catch (error) {
    const status =
      error.name === 'ValidationError' || error.code === 11000
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json(category);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Category not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Category removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
