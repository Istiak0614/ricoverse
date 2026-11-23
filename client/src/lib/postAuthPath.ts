// client/src/lib/postAuthPath.ts
// One rule for "where does a user land after signing in", used by the login hooks and GuestOnly,
// so the two never send the user to different places.
import type { Location } from 'react-router';
import type { User } from '@/types/user';

export const getPostAuthPath = (user: Pick<User, 'role'>, state: unknown): string => {
  const from = (state as { from?: Location } | null)?.from;
  if (from) return `${from.pathname}${from.search}`;
  return user.role === 'admin' ? '/admin' : '/';
};
