// client/src/pages/NotFoundPage.tsx
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="container-site flex flex-col items-center py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">This page went out of stock.</h1>
      <p className="text-ink-soft mt-4">The link may be broken, or the page may have moved.</p>
      <Link to="/" className="text-bronze mt-8 underline underline-offset-4">
        Back to home
      </Link>
    </section>
  );
}
