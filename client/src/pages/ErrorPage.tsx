// client/src/pages/ErrorPage.tsx
// Shown by React Router when a page crashes while rendering or loading.
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <section className="bg-cream flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-3 text-4xl">We dropped a stitch.</h1>
      <p className="text-muted mt-4 max-w-md font-mono text-sm">{message}</p>
      <Link to="/" className="text-bronze mt-8 underline underline-offset-4">
        Back to home
      </Link>
    </section>
  );
}
