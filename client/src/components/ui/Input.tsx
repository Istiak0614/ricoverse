// client/src/components/ui/Input.tsx
// Works with react-hook-form: <Input label="Email" {...register('email')} error={errors.email?.message} />
import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
  hint?: string;
  /** Element shown inside the right edge of the field, e.g. a show-password button */
  endAdornment?: ReactNode;
}

export function Input({ label, error, hint, endAdornment, id, className, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-eyebrow text-ink-soft block font-mono uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'bg-paper text-ink placeholder:text-muted/70 h-12 w-full border px-4 text-sm transition-colors',
            'focus:outline-none',
            error ? 'border-error' : 'border-line hover:border-taupe focus:border-ink',
            endAdornment && 'pr-12',
            className,
          )}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">{endAdornment}</div>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-error text-xs">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-muted text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
