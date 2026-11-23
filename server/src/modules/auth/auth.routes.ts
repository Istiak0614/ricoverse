// server/src/modules/auth/auth.routes.ts
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

// Slow down password guessing: 10 attempts per 15 minutes per IP.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many attempts. Try again in 15 minutes.',
    errorSources: [],
  },
});

router.post(
  '/register',
  authLimiter,
  validateRequest(AuthValidation.register),
  AuthController.register,
);
router.post('/login', authLimiter, validateRequest(AuthValidation.login), AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.get('/me', auth(), AuthController.getMe);

export const AuthRoutes = router;
