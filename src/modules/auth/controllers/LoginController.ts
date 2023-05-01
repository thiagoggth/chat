import { HandleResponse } from '../../../infra/HandleResponse';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { BaseController, ValidateResponse } from '../../@shared/controllers/BaseController';
import { LoginOutput } from '../DTOs/LoginDTOs';
import { LoginUseCase } from '../useCases/LoginUseCase';

export class LoginController extends BaseController {
  protected async specificImplementation(request: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handler(request.body);
    return HandleResponse.success<LoginOutput>(result, 'Login success');
  }

  protected validateRequest(request: HttpRequest): ValidateResponse | undefined {
    return undefined;
  }

  public constructor(private _useCase: LoginUseCase) {
    super();
  }
}
