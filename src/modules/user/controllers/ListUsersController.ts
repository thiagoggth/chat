import { HandleResponse } from '../../../infra/HandleResponse';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { BaseController, ValidateResponse } from '../../@shared/controllers/BaseController';
import { ListUsersUseCase } from '../useCases/ListUsersUseCase';

export class ListUsersController extends BaseController {
  private useCase = new ListUsersUseCase();

  protected async specificImplementation(request: HttpRequest): Promise<HttpResponse> {
    const users = await this.useCase.handler();
    return HandleResponse.success(users, 'List with success');
  }

  protected validateRequest(request: HttpRequest): ValidateResponse | undefined {
    return undefined;
  }
}
