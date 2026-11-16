// client/src/hooks/useHealth.ts
// Pattern for every data hook: one queryKey per resource, the fetcher from api/.
import { useQuery } from '@tanstack/react-query';
import { getHealth } from '@/api/health.api';

export const healthKeys = {
  all: ['health'] as const,
};

export const useHealth = () =>
  useQuery({
    queryKey: healthKeys.all,
    queryFn: getHealth,
    refetchInterval: 30_000,
    retry: 1,
  });
