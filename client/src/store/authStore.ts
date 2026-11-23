// client/src/store/authStore.ts
// Who is signed in. The access token lives ONLY in memory (never localStorage),
// so an XSS bug cannot steal a long-lived token. On page reload we get a fresh
// access token from the httpOnly refresh cookie (see useAuthBootstrap).
import { create } from 'zustand';
import type { AuthPayload, User } from '@/types/user';

/**
 * idle     → app just started, session not checked yet
 * loading  → checking the refresh cookie
 * authenticated / unauthenticated → known
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setAuth: (payload: AuthPayload) => void;
  setUser: (user: User) => void;
  setStatus: (status: AuthStatus) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  status: 'idle',
  setAuth: ({ user, accessToken }) => set({ user, accessToken, status: 'authenticated' }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  clearAuth: () => set({ user: null, accessToken: null, status: 'unauthenticated' }),
}));

// Selectors (use these in components to avoid unnecessary re-renders)
export const selectUser = (s: AuthState) => s.user;
export const selectStatus = (s: AuthState) => s.status;
export const selectIsAdmin = (s: AuthState) => s.user?.role === 'admin';
