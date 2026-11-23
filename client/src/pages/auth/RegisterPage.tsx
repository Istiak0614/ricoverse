// client/src/pages/auth/RegisterPage.tsx
import { Link, useLocation } from 'react-router';
import { getErrorMessage, getErrorStatus, getFieldErrors } from '@/api/axios';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useRegister } from '@/hooks/useAuth';
import { toRegisterRequest } from '@/lib/validations/auth';

export function RegisterPage() {
  const registerUser = useRegister();
  const location = useLocation();
  const status = getErrorStatus(registerUser.error);

  // 409 = email already used → show it under the email field instead of a banner
  const fieldErrors =
    status === 409
      ? [{ path: 'email', message: getErrorMessage(registerUser.error) }]
      : getFieldErrors(registerUser.error);
  const serverError =
    registerUser.error && status !== 400 && status !== 409
      ? getErrorMessage(registerUser.error)
      : null;

  return (
    <div>
      <p className="eyebrow">Join RICOVERSE</p>
      <h1 className="mt-2 text-4xl">Create account</h1>
      <p className="text-ink-soft mt-3 text-sm">
        Already have an account?{' '}
        <Link
          to="/login"
          state={location.state}
          className="text-bronze underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-8">
        <RegisterForm
          onSubmit={(values) => registerUser.mutate(toRegisterRequest(values))}
          isSubmitting={registerUser.isPending}
          serverError={serverError}
          fieldErrors={fieldErrors}
        />
      </div>
    </div>
  );
}
