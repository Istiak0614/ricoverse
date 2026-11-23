// server/src/modules/auth/auth.validation.ts
import { z } from 'zod';

const email = z.email('Enter a valid email address').trim().toLowerCase();

const password = z
  .string({ error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be at most 72 characters') // bcrypt only uses the first 72 bytes
  .regex(/[A-Za-z]/, 'Password must contain a letter')
  .regex(/\d/, 'Password must contain a number');

// Bangladeshi mobile: 01XXXXXXXXX or +8801XXXXXXXXX
const bdPhone = z
  .string()
  .trim()
  .regex(/^(?:\+?88)?01[3-9]\d{8}$/, 'Enter a valid Bangladeshi mobile number');

const register = z.object({
  body: z.object({
    name: z
      .string({ error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(60),
    email,
    password,
    phone: bdPhone.optional().or(z.literal('').transform(() => undefined)),
  }),
});

const login = z.object({
  body: z.object({
    email,
    password: z.string({ error: 'Password is required' }).min(1, 'Password is required'),
  }),
});

export const AuthValidation = { register, login };

export type RegisterInput = z.infer<typeof register>['body'];
export type LoginInput = z.infer<typeof login>['body'];
