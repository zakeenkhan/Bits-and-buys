// test-neon-connection.js
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse the DATABASE_URL for logging (without password)
const dbUrl = process.env.DATABASE_URL || '';
const dbUrlForLogging = dbUrl ? 
  dbUrl.replace(/:([^:]+)@/, ':***@') : 
  'No DATABASE_URL provided';

console.log(`🔌 Testing connection to: ${dbUrlForLogging}`);

// Create a new client (not using pool for this test)
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon's SSL
  },
  connectionTimeoutMillis: 10000, // 10 second timeout
  query_timeout: 10000, // 10 second query timeout
});

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to Neon database...');
    await client.connect();
    
    console.log('✅ Connected to database!');
    
    // Test a simple query
    console.log('🔍 Running test query...');
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Test query successful!');
    console.log('   Database time:', result.rows[0].current_time);
    
    // Test database version
    const version = await client.query('SELECT version()');
    console.log('   Database version:', version.rows[0].version.split(' ').slice(0, 4).join(' '));
    
    // Check if the database is empty
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (tables.rows.length > 0) {
      console.log('📊 Found tables:', tables.rows.map(t => t.table_name).join(', '));
    } else {
      console.log('ℹ️  No tables found in the database. You may need to run migrations.');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('   Error:', error.message);
    
    if (error.code === 'ETIMEDOUT') {
      console.error('   Error: Connection timed out. Possible causes:');
      console.error('   - Your IP might not be whitelisted in the Neon dashboard');
      console.error('   - The database server might be under heavy load');
      console.error('   - There might be network connectivity issues');
    } else if (error.code === '3D000') {
      console.error('   Error: Database does not exist or access denied');
    } else if (error.code === '28P01') {
      console.error('   Error: Authentication failed. Please check your username and password');
    } else {
      console.error('   Error code:', error.code);
    }
    
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Connection closed.');
  }
}

// Run the test
testConnection().catch(console.error);
