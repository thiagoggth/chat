import { Router } from 'express';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { CreatePostController } from '../../modules/post/controllers/CreatePostController';
import { AuthorizeMiddleware } from '../middlewares/AuthorizeMiddleware';

export class PostRoutes implements IRoutes {
  private router: Router;

  public constructor(private _createPostController: CreatePostController) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/posts', AuthorizeMiddleware.execute, adaptRoute(this._createPostController));
    return this.router;
  }
}
