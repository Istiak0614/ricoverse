// client/src/components/auth/HeaderAccount.tsx
// Connects the presentational AccountMenu to the auth store.
import { useLogout } from '@/hooks/useAuth';
import { selectStatus, selectUser, useAuthStore } from '@/store/authStore';
import { AccountMenu } from './AccountMenu';

export function HeaderAccount() {
  const user = useAuthStore(selectUser);
  const status = useAuthStore(selectStatus);
  const logout = useLogout();

  // Avoid flashing "Sign in" while the session is being restored
  if (status === 'idle' || status === 'loading')
    return <div className="h-5 w-16" aria-hidden="true" />;

  return (
    <AccountMenu user={user} onSignOut={() => logout.mutate()} isSigningOut={logout.isPending} />
  );
}
