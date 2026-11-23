// client/src/components/dev/ApiStatusBadge.tsx
// Development-only badge (bottom-left) that proves the client can reach the API.
// It is not rendered in production builds.
import { getErrorMessage } from '@/api/axios';
import { useHealth } from '@/hooks/useHealth';
import { cn } from '@/lib/cn';

export function ApiStatusBadge() {
  const { data, isPending, isError, error } = useHealth();

  const label = isPending
    ? 'API: checking…'
    : isError
      ? `API: offline — ${getErrorMessage(error)}`
      : `API: online · DB ${data.db}`;

  const dot = isPending ? 'bg-warning' : isError ? 'bg-error' : 'bg-success';

  return (
    <div
      role="status"
      className="rounded-pill border-line bg-paper/95 text-ink-soft shadow-card fixed bottom-3 left-3 z-50 flex max-w-[90vw] items-center gap-2 border px-3 py-1.5 font-mono text-xs backdrop-blur"
    >
      <span className={cn('rounded-pill size-2 shrink-0', dot)} aria-hidden="true" />
      <span className="truncate">{label}</span>
    </div>
  );
}
