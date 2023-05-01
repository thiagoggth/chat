import { CreatePostController } from '../../../modules/post/controllers/CreatePostController';
import { CreatePostUseCaseFactory } from '../../useCases/posts/CreatePostUseCaseFactory';

export class CreatePostControllerFactory {
  public static make(): CreatePostController {
    return new CreatePostController(CreatePostUseCaseFactory.make());
  }
}
