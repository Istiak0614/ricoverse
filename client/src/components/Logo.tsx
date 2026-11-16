// client/src/components/Logo.tsx
// Text wordmark for now. When the real logo is ready:
//   1. save it as client/src/assets/logo.svg
//   2. import logo from '@/assets/logo.svg' and render <img src={logo} alt="RICOVERSE" className="h-6 w-auto" />
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="RICOVERSE home"
      className={cn(
        'font-display text-ink text-xl font-semibold tracking-[0.18em] sm:text-2xl',
        className,
      )}
    >
      RICOVERSE
    </Link>
  );
}
