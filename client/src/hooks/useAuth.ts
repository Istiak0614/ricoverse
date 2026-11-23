// client/src/hooks/useAuth.ts
// Everything components need for auth. Pages never call authApi directly.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { getErrorMessage, refreshSession } from '@/api/axios';
import { getPostAuthPath } from '@/lib/postAuthPath';
import { useAuthStore } from '@/store/authStore';
import type { User } from '@/types/user';

/** Where to go after signing in: the page they tried to open, else home (admins → dashboard). */
const useRedirectAfterAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (user: User) => navigate(getPostAuthPath(user, location.state), { replace: true });
};

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const redirect = useRedirectAfterAuth();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}`);
      redirect(data.user);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const redirect = useRedirectAfterAuth();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data);
      toast.success(`Welcome to RICOVERSE, ${data.user.name.split(' ')[0]}`);
      redirect(data.user);
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    // Sign out locally even if the request fails (e.g. offline)
    onSettled: (_data, error) => {
      clearAuth();
      queryClient.clear(); // drop any cached private data (orders, cart...)
      navigate('/', { replace: true });
      if (error) toast.error(getErrorMessage(error));
      else toast.success('You have been signed out');
    },
  });
};

/**
 * Call once at the app root. Uses the refresh cookie to restore the session after a reload.
 * Runs only while status is 'idle', so StrictMode's double effect does not call it twice.
 */
export const useAuthBootstrap = () => {
  useEffect(() => {
    const { status, setStatus } = useAuthStore.getState();
    if (status !== 'idle') return;
    setStatus('loading');
    void refreshSession();
  }, []);
};
