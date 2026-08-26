import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import productRoutes from './routes/productRoutes.js';
import productV1Routes from './routes/productV1Routes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

app.use('/api/users', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/review', reviewRoutes);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/suppliers', supplierRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/products', productV1Routes);
app.use('/api/v1/product', productV1Routes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/review', reviewRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
