// server/src/middlewares/validateRequest.ts
// Usage in a route:
//   router.post('/', validateRequest(ProductValidation.create), ProductController.create);
// The schema validates { body, query, params }. On success, req.body is replaced
// with the parsed (cleaned) value, so controllers only ever see valid data.
import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validateRequest = (schema: ZodType): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: unknown };

      if (parsed.body !== undefined) req.body = parsed.body;
      next();
    } catch (error) {
      next(error);
    }
  };
};
