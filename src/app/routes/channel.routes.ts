import { Router } from 'express';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { CreateChannelController } from '../../modules/channel/controllers/CreateChannelController';
import { AuthorizeMiddleware } from '../middlewares/AuthorizeMiddleware';

export class ChannelRoutes implements IRoutes {
  private router: Router;

  public constructor(private _createChannelController: CreateChannelController) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post(
      '/Channels',
      AuthorizeMiddleware.execute,
      adaptRoute(this._createChannelController)
    );
    return this.router;
  }
}
