// client/src/layouts/AuthLayout.tsx
// Split screen: brand panel on the left (desktop only), form on the right.
import { Link, Outlet } from 'react-router';
import { Logo } from '@/components/Logo';

export function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="bg-cream relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Logo />

        {/* Decorative arch, echoing a boutique window */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-center"
        >
          <div className="bg-sand h-[72%] w-[58%] rounded-t-full" />
          <div className="bg-taupe/70 absolute bottom-0 h-[52%] w-[38%] rounded-t-full" />
        </div>

        <div className="relative max-w-md">
          <p className="eyebrow">Members get more</p>
          <p className="font-display mt-4 text-4xl leading-tight">
            Early access to new drops, saved bags and{' '}
            <span className="text-bronze italic">faster checkout.</span>
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="bg-paper flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Logo className="lg:invisible" />
          <Link
            to="/"
            className="text-ink-soft hover:text-ink text-sm underline-offset-4 hover:underline"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
