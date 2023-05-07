import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { HandleMiddlewareError } from '../utils/HandleMiddlewareError';
import { validateToken } from '../utils/validateToken';

export abstract class AuthorizeMiddleware {
  public static async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const requestUser = (await validateToken(token)) as { id: string };
      req.body.requestUserId = requestUser.id;
      next();
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        return HandleMiddlewareError.unauthorized(res);
      }
      return HandleMiddlewareError.serverError(error.message, res);
    }
  }
}
