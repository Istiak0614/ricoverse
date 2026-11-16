// server/src/utils/catchAsync.ts
// Wraps an async controller so any thrown error goes to the global error handler.
// Express 5 already does this for async handlers; we keep the wrapper so every
// controller in the codebase looks the same and is explicit.
import type { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const catchAsync = (fn: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
