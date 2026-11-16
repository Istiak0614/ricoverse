// server/src/routes/index.ts
// Every module router is mounted here. To add a module, add one line to `moduleRoutes`.
import { Router } from 'express';
import { HealthRoutes } from '../modules/health/health.routes';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  { path: '/health', route: HealthRoutes },
  // { path: '/auth', route: AuthRoutes },          // WEB-3
  // { path: '/products', route: ProductRoutes },   // WEB-4
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
