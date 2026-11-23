// server/src/config/index.ts
// Loads .env once, validates it with Zod, and exports a typed config object.
// If a required variable is missing, the server stops at startup with a clear message.
import 'dotenv/config';
import { z } from 'zod';

const secret = (name: string) =>
  z
    .string({ error: `${name} is required — copy .env.example to .env` })
    .min(32, `${name} must be at least 32 characters (run: npm run secret)`);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z
    .string({ error: 'DATABASE_URL is required — copy .env.example to .env' })
    .min(1, 'DATABASE_URL is required'),
  CLIENT_URLS: z.string().default('http://localhost:5173'),

  // Auth (WEB-3)
  JWT_ACCESS_SECRET: secret('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: secret('JWT_REFRESH_SECRET'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).max(14).default(10),

  // Used only by `npm run seed:admin`
  ADMIN_NAME: z.string().default('RICOVERSE Admin'),
  ADMIN_EMAIL: z.email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
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
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  bcryptSaltRounds: env.BCRYPT_SALT_ROUNDS,
  admin: {
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  },
} as const;
