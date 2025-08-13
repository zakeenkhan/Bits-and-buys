import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Route Imports
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import clearanceRoutes from './routes/clearance.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// CORS setup
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://your-production-domain.com',
      'http://your-production-domain.com'
    ]
  : [
      'http://localhost:3001',
      'https://d62b8d255d62.ngrok-free.app',
      'http://d62b8d255d62.ngrok-free.app',
      'https://7622530959cb.ngrok-free.app',
      'http://7622530959cb.ngrok-free.app'
    ];

// Allow overriding CORS from environment
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// ✅ Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Import fs promises API
import { promises as fs } from 'fs';

// Start the Server with error handling
const server = app.listen(PORT, '0.0.0.0', async () => {
  const port = server.address().port;
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`✅ API available at http://localhost:${port}/api`);
  
  // Update the frontend .env file with the new port
  try {
    const frontendEnvPath = new URL('../frontend/.env', import.meta.url);
    
    // Read the current .env file
    let envContent = '';
    try {
      envContent = await fs.readFile(frontendEnvPath, 'utf8');
    } catch (readErr) {
      console.log('⚠️  Could not read frontend .env file, creating a new one...');
    }
    
    // Update the API URL
    const updatedEnv = envContent.replace(
      /REACT_APP_API_URL=.*/,
      `REACT_APP_API_URL=http://localhost:${port}/api`
    );
    
    // Write the updated content back to the file
    await fs.writeFile(frontendEnvPath, updatedEnv, 'utf8');
    console.log(`✅ Updated frontend .env to use port ${port}`);
  } catch (err) {
    console.error('⚠️  Could not update frontend .env file:', err.message);
  }
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
