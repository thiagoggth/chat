import { HandleResponse } from '../../../infra/HandleResponse';
import { Report } from '../../../infra/Report';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';

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
      return HandleResponse.serverError(error);
    }
  }

  protected abstract specificImplementation(request: HttpRequest): Promise<HttpResponse>;

  protected abstract validateRequest(request: HttpRequest): undefined | ValidateResponse;
}
