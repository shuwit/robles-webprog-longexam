import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Public / Protected
export const addToCart = async (req, res) => {
  const { userId, productId, qty } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    // If no cart exists for user, create one
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        cartItems: [{ product: productId, qty: qty || 1 }],
      });
      return res.status(201).json(cart);
    }

    // If cart exists, check if product is already in the cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.cartItems[itemIndex].qty += qty || 1;
    } else {
      // Product doesn't exist in cart, add it
      cart.cartItems.push({ product: productId, qty: qty || 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user cart
// @route   GET /api/cart/:userId
// @access  Public / Protected
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      'cartItems.product'
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
