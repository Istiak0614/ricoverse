// client/src/pages/auth/LoginPage.tsx
// FRONTEND VERSION: submits to a mock. Integration replaces `handleSubmit` with useLogin().
import { useState } from 'react';
import { Link } from 'react-router';
import { LoginForm } from '@/components/auth/LoginForm';
import type { LoginValues } from '@/lib/validations/auth';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginValues) => {
    setIsSubmitting(true);
    setServerError(null);
    await wait(800);
    // Mock: any password except "wrong" succeeds
    if (values.password === 'wrong') setServerError('Incorrect email or password');
    else console.info('Mock sign in', values.email);
    setIsSubmitting(false);
  };

  return (
    <div>
      <p className="eyebrow">Welcome back</p>
      <h1 className="mt-2 text-4xl">Sign in</h1>
      <p className="text-ink-soft mt-3 text-sm">
        New to RICOVERSE?{' '}
        <Link to="/register" className="text-bronze underline underline-offset-4">
          Create an account
        </Link>
      </p>

      <div className="mt-8">
        <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} serverError={serverError} />
      </div>
    </div>
  );
}
