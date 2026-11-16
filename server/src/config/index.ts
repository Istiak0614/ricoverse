// server/src/config/index.ts
// Loads .env once, validates it with Zod, and exports a typed config object.
// If a required variable is missing, the server stops at startup with a clear message.
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z
    .string({ error: 'DATABASE_URL is required — copy .env.example to .env' })
    .min(1, 'DATABASE_URL is required'),
  CLIENT_URLS: z.string().default('http://localhost:5173'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

const env = parsed.data;

export const config = {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  clientUrls: env.CLIENT_URLS.split(',').map((url) => url.trim()),
} as const;
