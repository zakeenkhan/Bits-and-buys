// config/db.js
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const { Pool } = pg;
dotenv.config();

// Get the current file and directory names for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse the DATABASE_URL for logging (don't log the actual password)
const dbUrl = process.env.DATABASE_URL || '';
const dbUrlForLogging = dbUrl ? 
  dbUrl.replace(/:([^:]+)@/, ':***@') : 
  'No DATABASE_URL provided';

console.log(`🔌 Connecting to database: ${dbUrlForLogging.split('@')[1] || 'unknown'}`);

// Enhanced connection options
const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  // SSL configuration for Neon
  ssl: process.env.NODE_ENV === 'production' 
    ? { 
        rejectUnauthorized: false,
        sslmode: 'require'
      } 
    : false,
  // Connection pool settings
  max: 5, // Lower max connections for serverless environments
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // 10 second connection timeout
  query_timeout: 10000, // 10 second query timeout
  statement_timeout: 10000, // 10 second statement timeout
  // Keep-alive settings
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  // Additional options
  options: '-c search_path=public'
};

// Create the connection pool
const pool = new Pool(connectionConfig);

// Test the database connection with retry logic
async function testConnectionWithRetry(retries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    let client;
    try {
      console.log(`🔍 Attempting to connect to database (Attempt ${i + 1}/${retries})...`);
      
      // Test with a simple query
      client = await pool.connect();
      const result = await client.query('SELECT NOW() as now');
      
      console.log('✅ Successfully connected to the database');
      console.log('   Database time:', result.rows[0].now);
      
      // Test a more complex query to verify full access
      await client.query('SELECT 1 as test');
      
      return true;
    } catch (error) {
      lastError = error;
      console.error(`❌ Connection attempt ${i + 1} failed:`, error.message);
      
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } finally {
      if (client) client.release();
    }
  }
  
  // If we get here, all retries failed
  console.error('❌ All connection attempts failed. Last error:');
  console.error('   Error code:', lastError.code);
  console.error('   Error message:', lastError.message);
  console.error('   Connection string:', dbUrlForLogging);
  
  // Provide helpful debugging information
  if (lastError.code === 'ENOTFOUND') {
    console.error('   Error: Could not resolve the database hostname');
    console.error('   Please check your internet connection and the database hostname');
  } else if (lastError.code === 'ETIMEDOUT') {
    console.error('   Error: Connection timed out. Possible causes:');
    console.error('   - Your IP might be blocked by the database firewall');
    console.error('   - The database server might be under heavy load');
    console.error('   - There might be network connectivity issues');
  } else if (lastError.code === '3D000') {
    console.error('   Error: Database does not exist or access denied');
    console.error('   Please verify the database name and your permissions');
  } else if (lastError.code === '28P01') {
    console.error('   Error: Authentication failed. Please check:');
    console.error('   - Database username and password');
    console.error('   - If using a connection pool, verify the user has proper permissions');
  } else if (lastError.code === 'ECONNREFUSED') {
    console.error('   Error: Connection refused. The database server might be down');
  } else {
    console.error('   Unknown error. Please check your database configuration');
  }
  
  return false;
}

// Test connection on startup if not in test environment
let isConnected = false;
if (process.env.NODE_ENV !== 'test') {
  isConnected = await testConnectionWithRetry(3, 2000);
  if (!isConnected) {
    console.error('\n❌ Fatal: Could not connect to the database. Exiting...');
    console.error('💡 Troubleshooting tips:');
    console.error('1. Verify your DATABASE_URL is correct');
    console.error('2. Check if your IP is whitelisted in the Neon dashboard');
    console.error('3. Ensure the database is running and accessible');
    console.error('4. Check your internet connection and firewall settings');
    process.exit(1);
  }
}

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Don't crash the app on a database error
});

// Export the pool for use in the application
export default pool;
