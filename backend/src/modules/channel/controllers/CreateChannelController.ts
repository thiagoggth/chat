import { HandleResponse } from '../../../infra/HandleResponse';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { BaseController, ValidateResponse } from '../../@shared/controllers/BaseController';
import { CreateChannelOutput } from '../DTOs/CreateChannelDTO';
import { CreateChannelUseCase } from '../useCases/CreateChannelUseCase';

export class CreateChannelController extends BaseController {
  public constructor(private _useCase: CreateChannelUseCase) {
    super();
  }

  protected async specificImplementation(request: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handler(request.body);
    return HandleResponse.created<CreateChannelOutput>(result, 'Post created successfully');
  }

  protected validateRequest(request: HttpRequest): ValidateResponse | undefined {
    return undefined;
  }
}
