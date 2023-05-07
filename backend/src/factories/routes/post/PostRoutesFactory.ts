import { PostRoutes } from '../../../app/routes/post.routes';
import { CreatePostControllerFactory } from '../../controllers/post/CreatePostControllerFactory';

export class PostRoutesFactory {
  public static make(): PostRoutes {
    const createPostController = CreatePostControllerFactory.make();
    return new PostRoutes(createPostController);
  }
}
