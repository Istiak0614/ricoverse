// client/src/routes/guards.tsx
// Route guards, used as layout routes in router.tsx:
//   { element: <RequireAuth />, children: [...] }                  signed-in users
//   { element: <RequireAuth roles={['admin']} />, children: [...] } admins only
//   { element: <GuestOnly />, children: [...] }                    signed-out users (login/register)
import { LoaderCircle } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { getPostAuthPath } from '@/lib/postAuthPath';
import { selectStatus, selectUser, useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types/user';

export function SessionLoader() {
  return (
    <div role="status" className="text-muted flex min-h-[50vh] items-center justify-center">
      <LoaderCircle className="size-6 animate-spin" aria-hidden="true" />
      <span className="sr-only">Checking your session…</span>
    </div>
  );
}

export function RequireAuth({ roles }: { roles?: UserRole[] }) {
  const status = useAuthStore(selectStatus);
  const user = useAuthStore(selectUser);
  const location = useLocation();

  if (status === 'idle' || status === 'loading') return <SessionLoader />;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/403" replace />;

  return <Outlet />;
}

export function GuestOnly() {
  const status = useAuthStore(selectStatus);
  const user = useAuthStore(selectUser);
  const location = useLocation();

  if (status === 'idle' || status === 'loading') return <SessionLoader />;
  if (user) return <Navigate to={getPostAuthPath(user, location.state)} replace />;

  return <Outlet />;
}
