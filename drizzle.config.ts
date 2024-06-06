import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  schema: './server/schema.ts',
  out: './server/migrations',
});
