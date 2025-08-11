import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route Imports
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import clearanceRoutes from './routes/clearance.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

// ✅ CORS setup (simplified – no cookies needed)
app.use(cors({
  origin: 'http://localhost:3001' // Your frontend URL
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/summer-offers', offerRoutes);
app.use('/api/clearance-items', clearanceRoutes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 Bits & Buy API is running!');
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
