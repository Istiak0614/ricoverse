// client/src/App.tsx
// App-wide providers live here (Integration owns this file).
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { ApiStatusBadge } from '@/components/dev/ApiStatusBadge';
import { useAuthBootstrap } from '@/hooks/useAuth';
import { queryClient } from '@/lib/queryClient';
import { router } from '@/routes/router';

export default function App() {
  useAuthBootstrap(); // restore the session from the refresh cookie on page load

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: 'rounded-none! border-line! font-sans! shadow-card!',
            title: 'text-ink!',
          },
        }}
      />
      {import.meta.env.DEV && (
        <>
          <ApiStatusBadge />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </>
      )}
    </QueryClientProvider>
  );
}
