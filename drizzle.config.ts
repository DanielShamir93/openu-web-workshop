import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './models/drizzle/*',
  out: './data/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});
