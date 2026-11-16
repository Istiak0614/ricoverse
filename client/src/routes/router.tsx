// client/src/routes/router.tsx
// All app routes. Integration adds ProtectedRoute / RoleRoute wrappers here in WEB-3.
import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/layouts/MainLayout';
import { ErrorPage } from '@/pages/ErrorPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { StyleGuidePage } from '@/pages/StyleGuidePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'styleguide', element: <StyleGuidePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
