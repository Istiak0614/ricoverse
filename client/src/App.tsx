// client/src/App.tsx
import { RouterProvider } from 'react-router';
import { router } from '@/routes/router';

export default function App() {
  return <RouterProvider router={router} />;
}
