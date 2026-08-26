import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import Supplier from '../models/supplierModel.js';

const escapeRegex = (value = '') =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildSort = (sort) => {
  if (!sort) {
    return { createdAt: -1 };
  }

  if (sort.startsWith('-')) {
    return { [sort.slice(1)]: -1 };
  }

  return { [sort]: 1 };
};

const findByName = (Model, name) =>
  Model.findOne({
    name: { $regex: `^${escapeRegex(name)}$`, $options: 'i' },
  });

export const listProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const { category, supplier, sort, search } = query;
  const filter = {};

  if (category) {
    const categoryDoc = await findByName(Category, category);
    if (!categoryDoc) {
      return { page, limit, total: 0, pages: 1, products: [] };
    }
    filter.category = categoryDoc._id;
  }

  if (supplier) {
    const supplierDoc = await findByName(Supplier, supplier);
    if (!supplierDoc) {
      return { page, limit, total: 0, pages: 1, products: [] };
    }
    filter.supplier = supplierDoc._id;
  }

  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: pattern }, { description: pattern }];
  }

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate('category', 'name description')
    .populate('supplier', 'name description')
    .sort(buildSort(sort))
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit) || 1,
    products,
  };
};

export const getPopulatedProduct = (id) =>
  Product.findById(id)
    .populate('category', 'name description')
    .populate('supplier', 'name description');
