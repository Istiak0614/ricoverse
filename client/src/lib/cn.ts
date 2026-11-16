// client/src/lib/cn.ts
// Merge Tailwind classes safely: cn('px-4', isActive && 'bg-ink', className)
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
