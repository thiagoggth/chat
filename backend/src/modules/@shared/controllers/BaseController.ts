import { HandleResponse } from '../../../infra/HandleResponse';
import { Report } from '../../../infra/Report';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { UserOrPasswordWrongError } from '../../auth/errors/UserOrPasswordWrogError';
import { AlreadyExists } from '../errors/AlreadyExists';
import { InvalidValuesError } from '../errors/InvalidValuesError';
import { NotFoundError } from '../errors/NotFoundError';

export type ValidateResponse = {
  reports: Report[];
  message: string;
};

export abstract class BaseController {
  public async execute(request: HttpRequest): Promise<HttpResponse> {
    try {
      const resultValidation = this.validateRequest(request);

      if (resultValidation) {
        return HandleResponse.badRequest(resultValidation.message, resultValidation.reports);
      }

      const response = await this.specificImplementation(request);

      return response;
    } catch (error: any) {
      console.error(error);
      const report = new Report(error.propName, error.message);

      switch (error.constructor) {
        case NotFoundError:
          return HandleResponse.notFound(report.message);
        case InvalidValuesError:
          return HandleResponse.badRequest(error.message, [report]);
        case AlreadyExists:
          return HandleResponse.conflict(error.message, [report]);
        case UserOrPasswordWrongError:
          return HandleResponse.unauthorized(error.message);
        default:
          return HandleResponse.serverError(error);
      }
    }
  }

  protected abstract specificImplementation(request: HttpRequest): Promise<HttpResponse>;

  protected abstract validateRequest(request: HttpRequest): undefined | ValidateResponse;
}
