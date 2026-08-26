import Order from '../models/orderModel.js';
import { HttpStatus } from '../config/constants.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.status(HttpStatus.OK).json(orders);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json(order);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(HttpStatus.OK).json(orders);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(HttpStatus.CREATED).json(order);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json(order);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Order removed' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
