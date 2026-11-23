// client/src/components/auth/RegisterForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { registerSchema, type RegisterValues } from '@/lib/validations/auth';
import type { AuthFormProps } from './types';
import { useServerFieldErrors } from './useServerFieldErrors';

const FIELDS = ['name', 'email', 'phone', 'password'] as const;

export function RegisterForm({
  onSubmit,
  isSubmitting,
  serverError,
  fieldErrors,
}: AuthFormProps<RegisterValues>) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onTouched',
  });

  useServerFieldErrors(fieldErrors, setError, FIELDS);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {serverError && <Alert>{serverError}</Alert>}

      <Input
        label="Full name"
        autoComplete="name"
        placeholder="Tajrin Ahmed"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="01XXXXXXXXX"
        hint="For delivery updates only."
        error={errors.phone?.message}
        {...register('phone')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="8+ characters"
          hint="Use letters and numbers."
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Repeat password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-ink-soft flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="accent-ink mt-0.5 size-4 shrink-0"
            aria-invalid={errors.acceptTerms ? true : undefined}
            {...register('acceptTerms')}
          />
          <span>
            I agree to the{' '}
            <Link to="/terms" className="text-bronze underline underline-offset-4">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-bronze underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="text-error text-xs">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? 'Creating account' : 'Create account'}
      </Button>
    </form>
  );
}
