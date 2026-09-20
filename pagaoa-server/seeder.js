import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Category from './models/categoryModel.js';
import Supplier from './models/supplierModel.js';
import Product from './models/productModel.js';
import Cart from './models/cartModel.js';
import Order from './models/orderModel.js';
import Review from './models/reviewModel.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Cart.deleteMany();
    await Review.deleteMany();
    await Product.deleteMany();
    await Supplier.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Old data destroyed');

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@email.com',
        password: 'password123',
        role: 'Admin',
        isAdmin: true,
        isActive: true,
      },
      {
        name: 'John Doe',
        email: 'john@email.com',
        password: 'password123',
        role: 'Customer',
        isAdmin: false,
        isActive: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@email.com',
        password: 'password123',
        role: 'Customer',
        isAdmin: false,
        isActive: true,
      },
    ]);

    console.log('3 Users inserted');

    const createdCategories = await Category.insertMany([
      { name: 'Apparel', description: 'Campus clothing and uniforms' },
      { name: 'Electronics', description: 'Gadgets and student tech' },
      { name: 'Accessories', description: 'Bags, caps, and everyday extras' },
    ]);

    console.log('3 Categories inserted');

    const createdSuppliers = await Supplier.insertMany([
      { name: 'Nike', description: 'Athletic apparel and campus wear' },
      { name: 'Adidas', description: 'Sports gear and student essentials' },
      { name: 'Campus Supply Co', description: 'School merchandise and accessories' },
    ]);

    console.log('3 Suppliers inserted');

    const createdProducts = await Product.insertMany([
      {
        name: 'Bulldog Hoodie',
        description: 'Warm campus hoodie (jacket-style) with embroidered Bulldog crest.',
        price: 1499,
        stock: 50,
        image:
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
        category: createdCategories[0]._id,
        supplier: createdSuppliers[0]._id,
      },
      {
        name: 'Campus Laptop Sleeve',
        description: 'Padded sleeve that keeps notebooks and laptops protected.',
        price: 799,
        stock: 80,
        image:
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
        category: createdCategories[1]._id,
        supplier: createdSuppliers[1]._id,
      },
      {
        name: 'Bulldog Tumbler',
        description: 'Insulated tumbler that keeps coffee hot through lectures.',
        price: 549,
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
        category: createdCategories[2]._id,
        supplier: createdSuppliers[2]._id,
      },
    ]);

    console.log('3 Products inserted');

    await Cart.insertMany([
      {
        user: createdUsers[0]._id,
        cartItems: [
          { product: createdProducts[0]._id, qty: 2 },
          { product: createdProducts[1]._id, qty: 1 },
        ],
      },
      {
        user: createdUsers[1]._id,
        cartItems: [{ product: createdProducts[2]._id, qty: 1 }],
      },
      {
        user: createdUsers[2]._id,
        cartItems: [
          { product: createdProducts[0]._id, qty: 1 },
          { product: createdProducts[2]._id, qty: 2 },
        ],
      },
    ]);

    console.log('3 Carts inserted');

    await Order.insertMany([
      {
        user: createdUsers[0]._id,
        orderItems: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].name,
            image: createdProducts[0].image,
            price: createdProducts[0].price,
            qty: 1,
          },
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Manila',
          postalCode: '1000',
          country: 'Philippines',
        },
        paymentMethod: 'PayPal',
        totalPrice: createdProducts[0].price,
        isPaid: true,
        isDelivered: false,
        status: 'confirmed',
      },
      {
        user: createdUsers[1]._id,
        orderItems: [
          {
            product: createdProducts[1]._id,
            name: createdProducts[1].name,
            image: createdProducts[1].image,
            price: createdProducts[1].price,
            qty: 2,
          },
        ],
        shippingAddress: {
          address: '456 Taft Ave',
          city: 'Manila',
          postalCode: '1004',
          country: 'Philippines',
        },
        paymentMethod: 'GCash',
        totalPrice: createdProducts[1].price * 2,
        isPaid: false,
        isDelivered: false,
        status: 'pending',
      },
      {
        user: createdUsers[2]._id,
        orderItems: [
          {
            product: createdProducts[2]._id,
            name: createdProducts[2].name,
            image: createdProducts[2].image,
            price: createdProducts[2].price,
            qty: 1,
          },
        ],
        shippingAddress: {
          address: '789 EDSA',
          city: 'Quezon City',
          postalCode: '1100',
          country: 'Philippines',
        },
        paymentMethod: 'Cash on Delivery',
        totalPrice: createdProducts[2].price,
        isPaid: false,
        isDelivered: true,
        status: 'ready_for_claiming',
      },
    ]);

    console.log('3 Orders inserted');

    await Review.insertMany([
      {
        user: createdUsers[0]._id,
        product: createdProducts[0]._id,
        name: createdUsers[0].name,
        rating: 5,
        comment: 'Amazing hoodie, very comfortable.',
      },
      {
        user: createdUsers[1]._id,
        product: createdProducts[1]._id,
        name: createdUsers[1].name,
        rating: 4,
        comment: 'Great sleeve, fits my laptop perfectly.',
      },
      {
        user: createdUsers[2]._id,
        product: createdProducts[2]._id,
        name: createdUsers[2].name,
        rating: 5,
        comment: 'Keeps my coffee hot all day.',
      },
    ]);

    console.log('3 Reviews inserted');
    console.log('All data successfully seeded');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
