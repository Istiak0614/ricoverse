// server/src/modules/auth/auth.controller.ts
import type { CookieOptions, Response } from 'express';
import { config } from '../../config';
import { AppError } from '../../utils/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const REFRESH_COOKIE = 'refreshToken';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// In production the client (Vercel) and API (Render) are different sites,
// so the cookie must be SameSite=None + Secure to be sent cross-site.
const refreshCookieOptions: CookieOptions = {
  httpOnly: true, // JavaScript cannot read it → safe from XSS token theft
  secure: config.isProduction,
  sameSite: config.isProduction ? 'none' : 'lax',
  path: '/api/v1/auth', // only sent to auth routes
};

const setRefreshCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE, token, { ...refreshCookieOptions, maxAge: SEVEN_DAYS_MS });
};

const register = catchAsync(async (req, res) => {
  const { refreshToken, ...data } = await AuthService.register(req.body);
  setRefreshCookie(res, refreshToken);
  sendResponse(res, { statusCode: 201, message: 'Account created', data });
});

const login = catchAsync(async (req, res) => {
  const { refreshToken, ...data } = await AuthService.login(req.body);
  setRefreshCookie(res, refreshToken);
  sendResponse(res, { statusCode: 200, message: 'Signed in', data });
});

const refreshToken = catchAsync(async (req, res) => {
  const token = (req.cookies as Record<string, string | undefined>)[REFRESH_COOKIE];
  try {
    const data = await AuthService.refreshAccessToken(token);
    sendResponse(res, { statusCode: 200, message: 'Token refreshed', data });
  } catch (error) {
    // A bad or expired refresh token means the session is over: remove the cookie.
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
    throw error instanceof AppError
      ? error
      : new AppError(401, 'Session expired. Please sign in again');
  }
});

const logout = catchAsync(async (_req, res) => {
  res.clearCookie(REFRESH_COOKIE, refreshCookieOptions);
  sendResponse(res, { statusCode: 200, message: 'Signed out', data: null });
});

const getMe = catchAsync(async (req, res) => {
  const user = await AuthService.getMe(req.user!.userId);
  sendResponse(res, { statusCode: 200, message: 'Profile fetched', data: user });
});

export const AuthController = { register, login, refreshToken, logout, getMe };
