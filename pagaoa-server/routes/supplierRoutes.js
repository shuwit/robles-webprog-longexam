import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router
  .route('/')
  .get(getSuppliers)
  .post(authentication, authorize('Admin'), createSupplier);

router
  .route('/:id')
  .get(getSupplierById)
  .put(authentication, authorize('Admin'), updateSupplier)
  .delete(authentication, authorize('Admin'), deleteSupplier);

export default router;
