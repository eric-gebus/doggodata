import 'dotenv/config';
import app from '../src/index';

if (!process.env.API_KEY) {
  console.error('FATAL: API_KEY not configured');
  process.exit(1);
}

export default app;
