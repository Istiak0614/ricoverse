// client/src/lib/validations/auth.ts
// Same rules as server/src/modules/auth/auth.validation.ts, so users see errors before submitting.
import { z } from 'zod';

const email = z.email('Enter a valid email address').trim().toLowerCase();

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name is too long'),
    email,
    phone: z
      .string()
      .trim()
      .refine((v) => v === '' || /^(?:\+?88)?01[3-9]\d{8}$/.test(v), {
        message: 'Enter a valid Bangladeshi mobile number',
      }),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .max(72, 'At most 72 characters')
      .regex(/[A-Za-z]/, 'Add at least one letter')
      .regex(/\d/, 'Add at least one number'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    acceptTerms: z.boolean().refine((v) => v, { message: 'Please accept the terms to continue' }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

/** What the API expects (no confirmPassword / acceptTerms, empty phone removed). */
export const toRegisterRequest = ({ name, email, phone, password }: RegisterValues) => ({
  name,
  email,
  password,
  ...(phone ? { phone } : {}),
});
