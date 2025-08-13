const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'https://your-vercel-app.vercel.app', // Replace with your Vercel URL
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
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

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Simple test route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// API Routes
app.use('/api/products', require('../routes/productRoutes')(pool));
app.use('/api/orders', require('../routes/orderRoutes')(pool));
app.use('/api/summer-offers', require('../routes/offerRoutes')(pool));
app.use('/api/clearance-items', require('../routes/clearance')(pool));

// Health check
app.get('/.netlify/functions/server', (req, res) => {
  res.json({ 
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Export the serverless function
const handler = serverless(app);

// Export the handler with the database connection
module.exports.handler = async (event, context) => {
  // You can add any pre-handler logic here
  const result = await handler(event, context);
  // You can add any post-handler logic here
  return result;
};
