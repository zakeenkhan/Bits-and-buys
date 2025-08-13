import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5004;

// Log environment
console.log('🚀 Starting server in', process.env.NODE_ENV || 'development', 'mode');
console.log('📡 Connecting to database...');

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://your-netlify-app.netlify.app' // Update with your Netlify URL after deployment
];

// Allow additional origins from environment variable
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// Test database connection endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const dbResult = await pool.query('SELECT NOW()');
    
    res.status(200).json({ 
      status: 'API is running', 
      database: 'connected',
      timestamp: new Date().toISOString(),
      dbTime: dbResult.rows[0].now
    });
  } catch (err) {
    console.error('❌ Health check failed:', err);
    res.status(500).json({ 
      status: 'API is running',
      database: 'connection failed',
      error: err.message 
    });
  }
});

// Import and use routes
app.use('/api/products', (await import('./routes/productRoutes.js')).default(pool));
app.use('/api/orders', (await import('./routes/orderRoutes.js')).default(pool));
app.use('/api/summer-offers', (await import('./routes/offerRoutes.js')).default(pool));
app.use('/api/clearance-items', (await import('./routes/clearance.js')).default(pool));

// Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 Bits & Buy API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 CORS allowed origins: ${allowedOrigins.join(', ')}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please close the other process or update the PORT in .env file.`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('💤 Server stopped');
    process.exit(0);
  });
});
