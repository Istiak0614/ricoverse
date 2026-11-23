// server/src/middlewares/auth.ts
// Protect a route:            router.get('/me', auth(), AuthController.getMe)
// Protect + restrict by role: router.post('/', auth(USER_ROLE.admin), ProductController.create)
import type { RequestHandler } from 'express';
import { config } from '../config';
import type { UserRole } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';
import { AppError } from '../utils/AppError';
import { verifyToken } from '../utils/jwt';

export const auth = (...allowedRoles: UserRole[]): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const header = req.headers.authorization;
      const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
      if (!token) throw new AppError(401, 'Please sign in to continue');

      const decoded = verifyToken(token, config.jwt.accessSecret);

      // Re-check the user on every request so blocked or deleted users lose access at once.
      const user = await User.findById(decoded.userId).select('+passwordChangedAt');
      if (!user) throw new AppError(401, 'This account no longer exists');
      if (user.isBlocked) throw new AppError(403, 'This account has been blocked');
      if (user.changedPasswordAfter(decoded.iat)) {
        throw new AppError(401, 'Password was changed. Please sign in again');
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        throw new AppError(403, 'You do not have permission to do this');
      }

      req.user = { ...decoded, role: user.role };
      next();
    } catch (error) {
      next(error);
    }
  };
};

/** Same as auth(...roles); reads well in routes: auth(), authorize('admin') */
export const authorize = (...roles: UserRole[]) => auth(...roles);
