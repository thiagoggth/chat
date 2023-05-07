import { Router } from 'express';
import { HandleResponse } from '../../infra/HandleResponse';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { CreateChannelController } from '../../modules/channel/controllers/CreateChannelController';
import { ChannelRepository } from '../../modules/channel/repositories/ChannelRepository';
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
    this.router.get('/Channels', AuthorizeMiddleware.execute, async (req, res) => {
      try {
        const channels = await new ChannelRepository().findByUserId(req.body.requestUserId);
        const result = HandleResponse.success(channels, 'Channels found');
        return res.status(res.statusCode).send(result.body);
      } catch (err: any) {
        const result = HandleResponse.serverError(err);
        return res.status(res.statusCode).send(result.body);
      }
    });
    return this.router;
  }
}
