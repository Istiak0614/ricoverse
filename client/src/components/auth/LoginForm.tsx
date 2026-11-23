// client/src/components/auth/LoginForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { loginSchema, type LoginValues } from '@/lib/validations/auth';
import type { AuthFormProps } from './types';
import { useServerFieldErrors } from './useServerFieldErrors';

const FIELDS = ['email', 'password'] as const;

export function LoginForm({
  onSubmit,
  isSubmitting,
  serverError,
  fieldErrors,
}: AuthFormProps<LoginValues>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  useServerFieldErrors(fieldErrors, setError, FIELDS);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {serverError && <Alert>{serverError}</Alert>}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <PasswordInput
        label="Password"
        autoComplete="current-password"
        placeholder="Your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? 'Signing in' : 'Sign in'}
      </Button>
    </form>
  );
}
