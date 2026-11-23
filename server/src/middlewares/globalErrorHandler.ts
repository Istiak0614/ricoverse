// server/src/middlewares/globalErrorHandler.ts
// Every error in the app ends here and leaves as the same JSON shape:
// { success: false, message, errorSources: [{ path, message }], stack? }
import type { ErrorRequestHandler } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { config } from '../config';
import { AppError } from '../utils/AppError';

interface ErrorSource {
  path: string;
  message: string;
}

interface NormalizedError {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

const isDuplicateKeyError = (
  err: unknown,
): err is { code: number; keyValue: Record<string, unknown> } =>
  typeof err === 'object' && err !== null && (err as { code?: number }).code === 11000;

const normalizeError = (err: unknown): NormalizedError => {
  // 1. Zod validation (request body, query, params)
  if (err instanceof ZodError) {
    return {
      statusCode: 400,
      message: 'Validation failed',
      errorSources: err.issues.map((issue) => ({
        // drop the leading "body" / "query" / "params" so the client sees the field name
        path: issue.path.slice(1).join('.') || issue.path.join('.'),
        message: issue.message,
      })),
    };
  }

  // 2. Mongoose schema validation
  if (err instanceof mongoose.Error.ValidationError) {
    return {
      statusCode: 400,
      message: 'Validation failed',
      errorSources: Object.values(err.errors).map((e) => ({ path: e.path, message: e.message })),
    };
  }

  // 3. Invalid ObjectId, e.g. GET /products/abc
  if (err instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      message: `Invalid ${err.path}: ${String(err.value)}`,
      errorSources: [{ path: err.path, message: 'Invalid id' }],
    };
  }

  // 4. Unique index violation, e.g. email already registered
  if (isDuplicateKeyError(err)) {
    const field = Object.keys(err.keyValue)[0] ?? 'field';
    return {
      statusCode: 409,
      message: `${field} already exists`,
      errorSources: [{ path: field, message: `${String(err.keyValue[field])} is already taken` }],
    };
  }

  // 5. Bad or expired JWT (access or refresh token)
  if (err instanceof TokenExpiredError) {
    return {
      statusCode: 401,
      message: 'Your session has expired. Please sign in again',
      errorSources: [{ path: 'token', message: 'Token expired' }],
    };
  }
  if (err instanceof JsonWebTokenError) {
    return {
      statusCode: 401,
      message: 'Invalid session. Please sign in again',
      errorSources: [{ path: 'token', message: 'Invalid token' }],
    };
  }

  // 6. Errors we threw on purpose
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      message: err.message,
      errorSources: [{ path: '', message: err.message }],
    };
  }

  // 7. Anything else is a bug: hide details in production
  const message = err instanceof Error ? err.message : 'Something went wrong';
  return {
    statusCode: 500,
    message: config.isProduction ? 'Something went wrong' : message,
    errorSources: [{ path: '', message: config.isProduction ? 'Internal server error' : message }],
  };
};

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode, message, errorSources } = normalizeError(err);

  if (statusCode >= 500) console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(!config.isProduction && err instanceof Error && { stack: err.stack }),
  });
};
