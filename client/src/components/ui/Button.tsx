// client/src/components/ui/Button.tsx
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-ink text-paper hover:bg-bronze-dark disabled:bg-ink/60',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper disabled:opacity-50',
  ghost: 'text-ink hover:bg-sand/60 disabled:opacity-50',
} as const;

const sizes = {
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-sm',
} as const;

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-mono tracking-[0.12em] uppercase transition-colors disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
