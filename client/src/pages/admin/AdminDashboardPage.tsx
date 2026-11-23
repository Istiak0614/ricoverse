// client/src/pages/admin/AdminDashboardPage.tsx
// Placeholder so we can test admin-only routing. The real dashboard is WEB-12.
export function AdminDashboardPage() {
  return (
    <section className="container-site py-20">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-4xl">Dashboard</h1>
      <p className="text-ink-soft mt-4 max-w-xl">
        Only admins can see this page. Products, orders, users and analytics arrive in the Admin
        Dashboard module.
      </p>
    </section>
  );
}
