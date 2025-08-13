// test-db-connection.js
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connection configuration
const config = {
  connectionString: process.env.DATABASE_URL,
  // For Neon, we need to use 'require' SSL mode
  ssl: process.env.NODE_ENV === 'production' 
    ? { 
        rejectUnauthorized: false,
        sslmode: 'require'
      } 
    : false,
  connectionTimeoutMillis: 10000,
  query_timeout: 10000,
  // Add these parameters to the connection string directly
  options: '-c search_path=public',
  // Add keepAlive to prevent connection timeouts
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
};

console.log('🔍 Testing database connection with config:');
console.log('   Host: ep-aged-tree-a1htye52-pooler.ap-southeast-1.aws.neon.tech');
console.log('   Database: neondb');
console.log('   User: neondb_owner');
console.log('   SSL: Enabled');

// Test connection
async function testConnection() {
  const client = new pg.Client(config);
  
  try {
    console.log('\n🔌 Attempting to connect...');
    await client.connect();
    console.log('✅ Successfully connected to the database!');
    
    // Test a simple query
    console.log('\n🔍 Running test query...');
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query successful! Database time:', result.rows[0].current_time);
    
    // Get database version
    const version = await client.query('SELECT version()');
    console.log('\n📊 Database version:', version.rows[0].version.split(' ').slice(0, 4).join(' '));
    
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error('   Error:', error.message);
    
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    
    if (error.code === 'ETIMEDOUT') {
      console.error('\n💡 Troubleshooting tips:');
      console.error('1. Check if your IP is whitelisted in the Neon dashboard');
      console.error('2. Verify your internet connection');
      console.error('3. Try disabling any VPN or proxy');
    }
    
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔌 Connection closed.');
  }
}

// Run the test
testConnection();
