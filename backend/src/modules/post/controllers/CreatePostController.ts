import { HandleResponse } from '../../../infra/HandleResponse';
import { HttpRequest, HttpResponse } from '../../../infra/adapters/HttpAdapter';
import { BaseController, ValidateResponse } from '../../@shared/controllers/BaseController';
import { CreatePostOutput } from '../DTOs/CreatePostDtos';
import { CreatePostUseCase } from '../useCases/CreatePostUseCase';

export class CreatePostController extends BaseController {
  public constructor(private _createPostUseCase: CreatePostUseCase) {
    super();
  }

  protected async specificImplementation(request: HttpRequest): Promise<HttpResponse> {
    const result = await this._createPostUseCase.handler(request.body);
    return HandleResponse.success<CreatePostOutput>(result, 'Post created with success');
  }

  protected validateRequest(request: HttpRequest): ValidateResponse | undefined {
    return undefined;
  }
}
