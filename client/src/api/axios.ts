// client/src/api/axios.ts
// The single HTTP client for the whole app. Every api/*.ts file imports `api` from here.
// - baseURL comes from VITE_API_URL
// - withCredentials sends the httpOnly refresh-token cookie
// - the auth module (WEB-3) adds the "attach access token" and "refresh on 401" interceptors here
import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1',
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

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
