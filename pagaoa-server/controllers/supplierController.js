import Supplier from '../models/supplierModel.js';
import { HttpStatus } from '../config/constants.js';

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(HttpStatus.OK).json(suppliers);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Supplier not found' });
    }

    res.status(HttpStatus.OK).json(supplier);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(HttpStatus.CREATED).json(supplier);
  } catch (error) {
    const status =
      error.name === 'ValidationError' || error.code === 11000
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Supplier not found' });
    }

    res.status(HttpStatus.OK).json(supplier);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Supplier not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Supplier removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
