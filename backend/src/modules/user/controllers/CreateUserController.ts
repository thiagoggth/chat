import { HandleResponse } from '../../../infra/HandleResponse';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { BaseController, ValidateResponse } from '../../@shared/controllers/BaseController';
import { CreateUserOutput } from '../DTOs/CreateUserDTO';
import { CreateUserUseCase } from '../useCases/CreateUsersUseCase';

export class CreateUserController extends BaseController {
  protected async specificImplementation(request: HttpRequest): Promise<HttpResponse> {
    const userInput = request.body;
    const userCreated = await this.createUserUseCase.handler(userInput);
    return HandleResponse.success<CreateUserOutput>(userCreated, 'User created successfully');
  }

  protected validateRequest(request: HttpRequest): ValidateResponse | undefined {
    return undefined;
  }

  public constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }
}
