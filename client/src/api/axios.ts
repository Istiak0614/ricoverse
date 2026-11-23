// client/src/api/axios.ts
// The single HTTP client for the whole app. Every api/*.ts file imports `api` from here.
// - baseURL comes from VITE_API_URL
// - withCredentials sends the httpOnly refresh-token cookie
// - attaches the in-memory access token to every request
// - on a 401, refreshes the access token ONCE (shared by parallel requests) and retries
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import type { ApiErrorResponse, ApiErrorSource, ApiResponse } from '@/types/api';
import type { AuthPayload } from '@/types/user';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Set on requests that must never trigger a token refresh (login, refresh itself) */
    skipAuthRefresh?: boolean;
    /** Internal: marks a request that was already retried after a refresh */
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1',
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// 1. Attach the access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. Refresh the access token using the cookie. Parallel callers share one request.
let refreshPromise: Promise<string | null> | null = null;

export const refreshSession = (): Promise<string | null> => {
  refreshPromise ??= api
    .post<ApiResponse<AuthPayload>>('/auth/refresh-token', undefined, { skipAuthRefresh: true })
    .then((res) => {
      useAuthStore.getState().setAuth(res.data.data);
      return res.data.data.accessToken;
    })
    .catch(() => {
      useAuthStore.getState().clearAuth();
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

// 3. On 401: refresh once, then replay the original request
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig | undefined;
    const shouldRefresh =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.skipAuthRefresh &&
      useAuthStore.getState().accessToken; // only if we thought we were signed in

    if (!shouldRefresh) return Promise.reject(error);

    original._retry = true;
    const newToken = await refreshSession();
    if (!newToken) return Promise.reject(error);

    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  },
);

// Turn any failed request into a readable message for toasts and forms.
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Partial<ApiErrorResponse> | undefined;
    if (data?.message) return data.message;
    if (error.code === 'ECONNABORTED') return 'The server took too long to respond.';
    if (!error.response) return 'Cannot reach the server. Is the API running?';
    return error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};

/** Field-level errors from a 400 response, e.g. [{ path: 'email', message: '...' }] */
export const getFieldErrors = (error: unknown): ApiErrorSource[] => {
  if (!(error instanceof AxiosError) || error.response?.status !== 400) return [];
  const data = error.response.data as Partial<ApiErrorResponse> | undefined;
  return (data?.errorSources ?? []).filter((e) => e.path);
};

export const getErrorStatus = (error: unknown): number | undefined =>
  error instanceof AxiosError ? error.response?.status : undefined;
