import { Router } from 'express';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { CreateUserController } from '../../modules/user/controllers/CreateUserController';

export class UserRoutes implements IRoutes {
  private router: Router;

  public constructor(private createUserController: CreateUserController) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/users', adaptRoute(this.createUserController));
    return this.router;
  }
}
