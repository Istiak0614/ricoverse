// server/src/utils/AppError.ts
// Throw this anywhere in a service or controller:
//   throw new AppError(404, 'Product not found');
// The global error handler turns it into a clean JSON response.
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}
