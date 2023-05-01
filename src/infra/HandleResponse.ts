import { Report } from './Report';
import { Result } from './Result';
import { HttpResponse } from './adapters/HttpAdapter';
import { HttpStatus } from './adapters/HttpStatus';

export abstract class HandleResponse {
  public static created<T>(data: T, message?: string): HttpResponse {
    return {
      status: HttpStatus.CREATED,
      body: new Result<T>(data, message)
    };
  }

  public static success<T>(data: T, message?: string): HttpResponse {
    return {
      status: HttpStatus.SUCCESS,
      body: new Result<T>(data, message)
    };
  }

  public static notFound(message: string, errors: Report[]): HttpResponse {
    return {
      status: HttpStatus.NOT_FOUND,
      body: new Result(null, message, false, errors)
    };
  }

  public static conflict(message: string, errors: Report[]): HttpResponse {
    return {
      status: HttpStatus.CONFLICT,
      body: new Result(null, message, false, errors)
    };
  }

  public static unexpectedErrors(message: string, errors: Report[]): HttpResponse {
    return {
      status: HttpStatus.INTERNAL_ERROR,
      body: new Result(null, message, false, errors)
    };
  }

  public static serverError(error: Error): HttpResponse {
    return {
      status: HttpStatus.INTERNAL_ERROR,
      body: new Result(null, `Internal server error - ${error.message}`, false)
    };
  }

  public static forbidden(message: string): HttpResponse {
    return {
      status: HttpStatus.FORBIDDEN,
      body: new Result(null, message, false)
    };
  }

  public static unauthorized(): HttpResponse {
    return {
      status: HttpStatus.UNAUTHORIZED,
      body: new Result(null, 'restricted access', false)
    };
  }

  public static badRequest(message: string, errors: Report[]): HttpResponse {
    return {
      status: HttpStatus.BAD_REQUEST,
      body: new Result(null, message, false, errors)
    };
  }
}
