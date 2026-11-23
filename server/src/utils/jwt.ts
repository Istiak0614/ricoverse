// server/src/utils/jwt.ts
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import type { UserRole } from '../modules/user/user.constant';

export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
}

export type VerifiedToken = AuthTokenPayload & JwtPayload & { iat: number };

export const createToken = (payload: AuthTokenPayload, secret: string, expiresIn: string) =>
  jwt.sign(payload, secret, { expiresIn: expiresIn as SignOptions['expiresIn'] });

/** Throws JsonWebTokenError / TokenExpiredError — the global error handler turns them into 401. */
export const verifyToken = (token: string, secret: string) =>
  jwt.verify(token, secret) as VerifiedToken;
