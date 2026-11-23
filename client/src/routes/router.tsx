// client/src/routes/router.tsx
// All app routes. Integration wraps /account, /admin and the auth pages with guards.
// Pages other than Home are lazy-loaded, so the home page doesn't download form libraries.
import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'styleguide',
        lazy: async () => ({ Component: (await import('@/pages/StyleGuidePage')).StyleGuidePage }),
      },
      {
        path: 'account',
        lazy: async () => ({
          Component: (await import('@/pages/account/AccountPage')).AccountPage,
        }),
      },
      {
        path: 'admin',
        lazy: async () => ({
          Component: (await import('@/pages/admin/AdminDashboardPage')).AdminDashboardPage,
        }),
      },
      {
        path: '403',
        lazy: async () => ({ Component: (await import('@/pages/ForbiddenPage')).ForbiddenPage }),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        lazy: async () => ({ Component: (await import('@/pages/auth/LoginPage')).LoginPage }),
      },
      {
        path: 'register',
        lazy: async () => ({ Component: (await import('@/pages/auth/RegisterPage')).RegisterPage }),
      },
    ],
  },
]);
