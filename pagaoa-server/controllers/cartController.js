import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import { HttpStatus } from '../config/constants.js';

const populateCart = (query) =>
  query.populate({
    path: 'cartItems.product',
    populate: { path: 'category', select: 'name' },
  });

export const getCarts = async (req, res) => {
  try {
    const carts = await populateCart(Cart.find({}));
    res.status(HttpStatus.OK).json(carts);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getCartByUser = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin' || req.user.isAdmin;
    if (!isAdmin && req.params.userId !== req.user._id.toString()) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    const cart = await populateCart(Cart.findOne({ user: req.params.userId }));

    if (!cart) {
      return res.status(HttpStatus.OK).json({ user: req.params.userId, cartItems: [] });
    }

    res.status(HttpStatus.OK).json(cart);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, qty = 1 } = req.body;
  const ownerId = req.user?._id || userId;

  try {
    if (!ownerId) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'User is required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: ownerId });

    if (!cart) {
      cart = await Cart.create({
        user: ownerId,
        cartItems: [{ product: productId, qty }],
      });
    } else {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].qty += Number(qty) || 1;
      } else {
        cart.cartItems.push({ product: productId, qty: Number(qty) || 1 });
      }

      await cart.save();
    }

    const populated = await populateCart(Cart.findById(cart._id));
    res.status(HttpStatus.OK).json(populated);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const isAdmin = req.user.role === 'Admin' || req.user.isAdmin;
    if (!isAdmin && req.params.userId !== req.user._id.toString()) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Cart not found' });
    }

    const item = cart.cartItems.find(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (!item) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Item not found in cart' });
    }

    const nextQty = Number(qty);

    if (!Number.isInteger(nextQty) || nextQty < 1) {
      cart.cartItems = cart.cartItems.filter(
        (cartItem) => cartItem.product.toString() !== productId
      );
    } else {
      item.qty = nextQty;
    }

    await cart.save();

    const populated = await populateCart(Cart.findById(cart._id));
    res.status(HttpStatus.OK).json(populated);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin' || req.user.isAdmin;
    if (!isAdmin && req.params.userId !== req.user._id.toString()) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Cart not found' });
    }

    const before = cart.cartItems.length;
    cart.cartItems = cart.cartItems.filter(
      (cartItem) => cartItem.product.toString() !== req.params.productId
    );

    if (cart.cartItems.length === before) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Item not found in cart' });
    }

    await cart.save();
    const populated = await populateCart(Cart.findById(cart._id));
    res.status(HttpStatus.OK).json(populated);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin' || req.user.isAdmin;
    if (!isAdmin && req.params.userId !== req.user._id.toString()) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied' });
    }

    const cart = await Cart.findOneAndDelete({ user: req.params.userId });

    if (!cart) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Cart not found' });
    }

    res.status(HttpStatus.OK).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
