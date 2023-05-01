import { Router } from 'express';
import { IRoutes } from '../../infra/IRoute';
import { adaptRoute } from '../../infra/adapters/expressRouteAdapter';
import { LoginController } from '../../modules/auth/controllers/LoginController';

export class AuthRoutes implements IRoutes {
  private router: Router;

  public constructor(private _loginController: LoginController) {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/auth/login', adaptRoute(this._loginController));
    return this.router;
  }
}
