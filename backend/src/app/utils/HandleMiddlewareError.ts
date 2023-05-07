import { Response } from 'express';
import { Result } from '../../infra/Result';
import { HttpStatus } from '../../infra/adapters/HttpStatus';

export class HandleMiddlewareError {
  public static forbidden(message: string, response: Response): Response {
    return response.status(HttpStatus.FORBIDDEN).send(new Result(null, message, false));
  }

  public static unauthorized(response: Response): Response {
    return response.status(HttpStatus.FORBIDDEN).send(new Result(null, 'restricted access', false));
  }

  public static serverError(error: Error, res: Response): Response {
    return res
      .status(HttpStatus.INTERNAL_ERROR)
      .send(new Result(null, `Internal server error - ${error.message}`, false));
  }
}
