import 'dotenv/config';

export default {
  DATABASE_URL: process.env.POSTGRES_PROD_URL || process.env.DATABASE_URL
};
