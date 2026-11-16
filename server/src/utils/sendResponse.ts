// server/src/utils/sendResponse.ts
// The one response shape the whole API uses: { success, message, data, meta? }
import type { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface ResponsePayload<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export const sendResponse = <T>(res: Response, payload: ResponsePayload<T>): void => {
  res.status(payload.statusCode).json({
    success: payload.statusCode < 400,
    message: payload.message,
    data: payload.data,
    ...(payload.meta && { meta: payload.meta }),
  });
};
