// client/src/pages/account/AccountPage.tsx
// FRONTEND VERSION: shows mockUser. Integration swaps it for the signed-in user.
// The full account area (addresses, orders) comes in WEB-9.
import { mockUser } from '@/mocks/user';
import type { User } from '@/types/user';

const memberSince = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

export function AccountView({ user }: { user: User }) {
  const rows = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone ?? '—' },
    { label: 'Member since', value: memberSince(user.createdAt) },
  ];

  return (
    <section className="bg-cream py-16">
      <div className="container-site max-w-3xl">
        <p className="eyebrow">My account</p>
        <h1 className="mt-2 text-4xl">Hello, {user.name.split(' ')[0]}.</h1>

        <dl className="divide-line border-line bg-paper mt-10 divide-y border">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr]">
              <dt className="text-eyebrow text-muted font-mono uppercase">{row.label}</dt>
              <dd className="text-sm">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AccountPage() {
  return <AccountView user={mockUser} />;
}
