// client/src/components/auth/AccountMenu.tsx
// Header account area. Shows "Sign in" for guests, or the user's name with links when signed in.
// Integration passes the real user and onSignOut.
import { LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router';
import type { User } from '@/types/user';

interface AccountMenuProps {
  user: Pick<User, 'name' | 'role'> | null;
  onSignOut?: () => void;
  isSigningOut?: boolean;
}

export function AccountMenu({ user, onSignOut, isSigningOut }: AccountMenuProps) {
  if (!user) {
    return (
      <Link
        to="/login"
        className="text-ink hover:text-bronze inline-flex items-center gap-2 text-sm transition-colors"
      >
        <UserRound className="size-4" aria-hidden="true" />
        Sign in
      </Link>
    );
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div className="flex items-center gap-4 text-sm">
      {user.role === 'admin' && (
        <Link
          to="/admin"
          className="text-bronze hidden items-center gap-1.5 hover:underline sm:inline-flex"
        >
          <ShieldCheck className="size-4" aria-hidden="true" />
          Admin
        </Link>
      )}
      <Link to="/account" className="hover:text-bronze inline-flex items-center gap-2">
        <UserRound className="size-4" aria-hidden="true" />
        <span className="max-w-24 truncate">{firstName}</span>
      </Link>
      <button
        type="button"
        onClick={onSignOut}
        disabled={isSigningOut}
        aria-label="Sign out"
        className="text-muted hover:text-ink transition-colors disabled:opacity-50"
      >
        <LogOut className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
