// client/src/routes/router.tsx
// All app routes. Pages other than Home are lazy-loaded.
// Guards (routes/guards.tsx) are layout routes: everything inside them is protected.
import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { GuestOnly, RequireAuth, SessionLoader } from '@/routes/guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <SessionLoader />,
    children: [
      // Public
      { index: true, element: <HomePage /> },
      {
        path: 'styleguide',
        lazy: async () => ({ Component: (await import('@/pages/StyleGuidePage')).StyleGuidePage }),
      },
      {
        path: '403',
        lazy: async () => ({ Component: (await import('@/pages/ForbiddenPage')).ForbiddenPage }),
      },

      // Any signed-in user (customer or admin)
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('@/pages/account/AccountPage')).AccountPage,
            }),
          },
        ],
      },

      // Admins only
      {
        element: <RequireAuth roles={['admin']} />,
        children: [
          {
            path: 'admin',
            lazy: async () => ({
              Component: (await import('@/pages/admin/AdminDashboardPage')).AdminDashboardPage,
            }),
          },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Signed-out users only (signed-in users are sent home)
  {
    element: <GuestOnly />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <SessionLoader />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            lazy: async () => ({ Component: (await import('@/pages/auth/LoginPage')).LoginPage }),
          },
          {
            path: 'register',
            lazy: async () => ({
              Component: (await import('@/pages/auth/RegisterPage')).RegisterPage,
            }),
          },
        ],
      },
    ],
  },
]);
