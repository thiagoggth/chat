import { Router } from 'express';
import { HandleResponse } from '../../infra/HandleResponse';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { CreatePostController } from '../../modules/post/controllers/CreatePostController';
import { PostRepository } from '../../modules/post/repositories/PostRepository';
import { AuthorizeMiddleware } from '../middlewares/AuthorizeMiddleware';

export class PostRoutes implements IRoutes {
  private router: Router;

  public constructor(private _createPostController: CreatePostController) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/posts', AuthorizeMiddleware.execute, adaptRoute(this._createPostController));
    this.router.get('/posts/:channelId', AuthorizeMiddleware.execute, async (req, res) => {
      const posts = await new PostRepository().listByChannelId(req.params?.channelId);
      const toReturn = HandleResponse.success(posts, 'posts found');
      return res.status(toReturn.status).send(toReturn.body);
    });
    return this.router;
  }
}
