import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import { HttpStatus } from '../config/constants.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json(orders);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
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

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin' || req.user.isAdmin;
    if (!isAdmin && !isOwner) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    res.status(HttpStatus.OK).json(order);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

    if (!cart || cart.cartItems.length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Cart is empty' });
    }

    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress?.address || !shippingAddress?.city || !paymentMethod) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Shipping address and payment method are required',
      });
    }

    const orderItems = cart.cartItems.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      qty: item.qty,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode || '0000',
        country: shippingAddress.country || 'Philippines',
      },
      paymentMethod,
      totalPrice,
      status: 'pending',
    });

    cart.cartItems = [];
    await cart.save();

    res.status(HttpStatus.CREATED).json(order);
  } catch (error) {
    const status =
      error.name === 'ValidationError'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({ message: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
    }

    order.status = 'confirmed';
    order.isPaid = true;
    await order.save();
    res.status(HttpStatus.OK).json(order);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const markOrderReady = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Order not found' });
    }

    order.status = 'ready_for_claiming';
    await order.save();
    res.status(HttpStatus.OK).json(order);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
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
