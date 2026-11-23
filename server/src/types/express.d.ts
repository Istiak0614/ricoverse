// server/src/types/express.d.ts
// Adds req.user, set by the auth() middleware.
import type { VerifiedToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: VerifiedToken;
    }
  }
}

export {};
