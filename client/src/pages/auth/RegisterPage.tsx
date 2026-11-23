// client/src/pages/auth/RegisterPage.tsx
// FRONTEND VERSION: submits to a mock. Integration replaces `handleSubmit` with useRegister().
import { useState } from 'react';
import { Link } from 'react-router';
import { RegisterForm } from '@/components/auth/RegisterForm';
import type { FieldError } from '@/components/auth/types';
import type { RegisterValues } from '@/lib/validations/auth';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  const handleSubmit = async (values: RegisterValues) => {
    setIsSubmitting(true);
    setFieldErrors([]);
    await wait(800);
    // Mock: "taken@example.com" behaves like an existing account
    if (values.email === 'taken@example.com') {
      setFieldErrors([{ path: 'email', message: 'An account with this email already exists' }]);
    } else {
      console.info('Mock register', values.email);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <p className="eyebrow">Join RICOVERSE</p>
      <h1 className="mt-2 text-4xl">Create account</h1>
      <p className="text-ink-soft mt-3 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-bronze underline underline-offset-4">
          Sign in
        </Link>
      </p>

      <div className="mt-8">
        <RegisterForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          fieldErrors={fieldErrors}
        />
      </div>
    </div>
  );
}
