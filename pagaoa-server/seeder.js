import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Category from './models/categoryModel.js';
import Product from './models/productModel.js';
import Cart from './models/cartModel.js';
import Order from './models/orderModel.js';
import Review from './models/reviewModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await Order.deleteMany();
    await Cart.deleteMany();
    await Review.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    
    console.log('Old Data Destroyed!');

    // 2. Insert 3 Users
    const users = [
      { name: 'Admin User', email: 'admin@email.com', password: 'password123' },
      { name: 'John Doe', email: 'john@email.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@email.com', password: 'password123' }
    ];
    
    const createdUsers = await User.insertMany(users);
    console.log('3 Sample Users Inserted!');
    
    const adminUserId = createdUsers[0]._id;
    const johnUserId = createdUsers[1]._id;

    // 3. Insert 3 Categories
    const categories = [
      { name: 'Apparel', description: 'Clothing and accessories' },
      { name: 'Electronics', description: 'Gadgets and tech' },
      { name: 'Accessories', description: 'Bags and caps' }
    ];
    
    const createdCategories = await Category.insertMany(categories);
    console.log('3 Sample Categories Inserted!');
    
    const apparelId = createdCategories[0]._id;
    const electronicsId = createdCategories[1]._id;
    const accessoriesId = createdCategories[2]._id;

    // 4. Insert 3 Products
    const products = [
      {
        name: 'Bulldog Hoodie',
        description: 'Warm and comfortable hoodie with Bulldog logo.',
        price: 35.99,
        category: apparelId,
        stock: 50,
        image: 'https://via.placeholder.com/300?text=Bulldog+Hoodie'
      },
      {
        name: 'Bulldog Laptop Sticker',
        description: 'High quality vinyl sticker.',
        price: 3.99,
        category: electronicsId,
        stock: 200,
        image: 'https://via.placeholder.com/300?text=Bulldog+Sticker'
      },
      {
        name: 'Bulldog Tumbler',
        description: 'Keep your coffee hot during classes.',
        price: 15.99,
        category: accessoriesId,
        stock: 30,
        image: 'https://via.placeholder.com/300?text=Bulldog+Tumbler'
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log('3 Sample Products Inserted!');

    // 5. Insert 3 Carts (one for each user, with some products)
    const carts = [
      {
        user: adminUserId,
        items: [
          { product: createdProducts[0]._id, quantity: 2 },
          { product: createdProducts[1]._id, quantity: 1 }
        ]
      },
      {
        user: johnUserId,
        items: [
          { product: createdProducts[2]._id, quantity: 1 }
        ]
      },
      {
        user: createdUsers[2]._id, // Jane
        items: [
          { product: createdProducts[0]._id, quantity: 1 },
          { product: createdProducts[2]._id, quantity: 2 }
        ]
      }
    ];

    await Cart.insertMany(carts);
    console.log('3 Sample Carts Inserted!');

    // 6. Insert 3 Orders
    const orders = [
      {
        user: adminUserId,
        orderItems: [
          { product: createdProducts[0]._id, qty: 1, name: createdProducts[0].name, image: createdProducts[0].image, price: createdProducts[0].price }
        ],
        shippingAddress: { address: '123 Main St', city: 'Manila', postalCode: '1000', country: 'Philippines' },
        paymentMethod: 'PayPal',
        taxPrice: 0,
        shippingPrice: 5,
        totalPrice: createdProducts[0].price + 5,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false
      },
      {
        user: johnUserId,
        orderItems: [
          { product: createdProducts[1]._id, qty: 2, name: createdProducts[1].name, image: createdProducts[1].image, price: createdProducts[1].price }
        ],
        shippingAddress: { address: '456 Taft Ave', city: 'Manila', postalCode: '1004', country: 'Philippines' },
        paymentMethod: 'Stripe',
        taxPrice: 0,
        shippingPrice: 2,
        totalPrice: (createdProducts[1].price * 2) + 2,
        isPaid: false,
        isDelivered: false
      },
      {
        user: createdUsers[2]._id, // Jane
        orderItems: [
          { product: createdProducts[2]._id, qty: 1, name: createdProducts[2].name, image: createdProducts[2].image, price: createdProducts[2].price }
        ],
        shippingAddress: { address: '789 EDSA', city: 'Quezon City', postalCode: '1100', country: 'Philippines' },
        paymentMethod: 'Cash On Delivery',
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: createdProducts[2].price,
        isPaid: false,
        isDelivered: true,
        deliveredAt: new Date()
      }
    ];

    await Order.insertMany(orders);
    console.log('3 Sample Orders Inserted!');

    // 7. Insert 3 Reviews
    const reviews = [
      {
        user: adminUserId,
        product: createdProducts[0]._id,
        name: 'Admin User',
        rating: 5,
        comment: 'Amazing hoodie, very comfortable!'
      },
      {
        user: johnUserId,
        product: createdProducts[1]._id,
        name: 'John Doe',
        rating: 4,
        comment: 'Great sticker but took a while to arrive.'
      },
      {
        user: createdUsers[2]._id,
        product: createdProducts[2]._id,
        name: 'Jane Smith',
        rating: 5,
        comment: 'Keeps my coffee hot all day.'
      }
    ];

    await Review.insertMany(reviews);
    console.log('3 Sample Reviews Inserted!');

    console.log('✅ ALL DATA SUCCESSFULLY SEEDED!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
