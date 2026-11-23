// client/src/pages/ForbiddenPage.tsx
import { Link } from 'react-router';

export function ForbiddenPage() {
  return (
    <section className="container-site flex flex-col items-center py-28 text-center">
      <p className="eyebrow">Error 403</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Members of staff only.</h1>
      <p className="text-ink-soft mt-4">Your account does not have access to this page.</p>
      <Link to="/" className="text-bronze mt-8 underline underline-offset-4">
        Back to home
      </Link>
    </section>
  );
}
