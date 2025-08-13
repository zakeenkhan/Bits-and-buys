import { exec } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...');
    
    // Run migrations using node-pg-migrate
    const migrate = exec(
      'npx node-pg-migrate up',
      { 
        env: { 
          ...process.env, 
          DATABASE_URL: process.env.DATABASE_URL,
          NODE_PATH: path.resolve(__dirname, 'node_modules')
        },
        cwd: __dirname
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Migration failed:', error);
          process.exit(1);
        }
        console.log(stdout);
        if (stderr) console.error('Migration stderr:', stderr);
        console.log('✅ Database migrations completed successfully!');
      }
    );

  } catch (error) {
    console.error('❌ Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
