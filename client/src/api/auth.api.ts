// client/src/api/auth.api.ts
// One function per endpoint in docs/api-contract.md → Auth
import { api } from '@/api/axios';
import type { ApiResponse } from '@/types/api';
import type { AuthPayload, User } from '@/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const authApi = {
  login: async (body: LoginRequest) => {
    const res = await api.post<ApiResponse<AuthPayload>>('/auth/login', body, {
      skipAuthRefresh: true,
    });
    return res.data.data;
  },

  register: async (body: RegisterRequest) => {
    const res = await api.post<ApiResponse<AuthPayload>>('/auth/register', body, {
      skipAuthRefresh: true,
    });
    return res.data.data;
  },

  logout: async () => {
    await api.post('/auth/logout', undefined, { skipAuthRefresh: true });
  },

  getMe: async () => {
    const res = await api.get<ApiResponse<User>>('/auth/me');
    return res.data.data;
  },
};
