// client/src/layouts/MainLayout.tsx
// Page shell for the customer site. The full header (mega menu, search, cart)
// and footer are built in the Design System module (WEB-2).
import { Outlet } from 'react-router';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { HeaderAccount } from '@/components/auth/HeaderAccount';
import { Logo } from '@/components/Logo';

const YEAR = new Date().getFullYear();

export function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AnnouncementBar />

      <header className="border-line bg-paper border-b">
        <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <Logo />
          <div className="flex justify-end">
            <HeaderAccount />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-line bg-cream border-t">
        <div className="container-site text-muted flex flex-col items-center justify-between gap-2 py-6 text-sm sm:flex-row">
          <span>© {YEAR} RICOVERSE. All rights reserved.</span>
          <span className="eyebrow">Made in Bangladesh</span>
        </div>
      </footer>
    </div>
  );
}
