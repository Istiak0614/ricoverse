// client/src/api/health.api.ts
import { api } from '@/api/axios';
import type { ApiResponse } from '@/types/api';

export interface HealthData {
  status: 'ok';
  env: string;
  db: string;
  uptime: number;
}

export const getHealth = async () => {
  const res = await api.get<ApiResponse<HealthData>>('/health');
  return res.data.data;
};
