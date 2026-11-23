// client/src/App.tsx
// App-wide providers live here (Integration owns this file).
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ApiStatusBadge } from '@/components/dev/ApiStatusBadge';
import { queryClient } from '@/lib/queryClient';
import { router } from '@/routes/router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <>
          <ApiStatusBadge />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </>
      )}
    </QueryClientProvider>
  );
}
