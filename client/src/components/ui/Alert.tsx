// client/src/components/ui/Alert.tsx
import { CircleAlert, CircleCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface AlertProps {
  tone?: 'error' | 'success';
  children: ReactNode;
  className?: string;
}

export function Alert({ tone = 'error', children, className }: AlertProps) {
  const Icon = tone === 'error' ? CircleAlert : CircleCheck;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 border px-4 py-3 text-sm',
        tone === 'error'
          ? 'border-error/30 bg-blush text-error'
          : 'border-success/30 bg-cream text-success',
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
