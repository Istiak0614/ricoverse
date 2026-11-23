// client/src/pages/auth/LoginPage.tsx
import { Link, useLocation } from 'react-router';
import { getErrorMessage, getErrorStatus, getFieldErrors } from '@/api/axios';
import { LoginForm } from '@/components/auth/LoginForm';
import { useLogin } from '@/hooks/useAuth';

export function LoginPage() {
  const login = useLogin();
  const location = useLocation();
  const cameFromProtectedPage = Boolean((location.state as { from?: unknown } | null)?.from);

  const fieldErrors = getFieldErrors(login.error);
  const serverError =
    login.error && getErrorStatus(login.error) !== 400 ? getErrorMessage(login.error) : null;

  return (
    <div>
      <p className="eyebrow">Welcome back</p>
      <h1 className="mt-2 text-4xl">Sign in</h1>
      <p className="text-ink-soft mt-3 text-sm">
        {cameFromProtectedPage ? 'Please sign in to continue. ' : 'New to RICOVERSE? '}
        <Link
          to="/register"
          state={location.state}
          className="text-bronze underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-8">
        <LoginForm
          onSubmit={(values) => login.mutate(values)}
          isSubmitting={login.isPending}
          serverError={serverError}
          fieldErrors={fieldErrors}
        />
      </div>
    </div>
  );
}
