import { AuthRoutes } from '../../../app/routes/auth.routes';
import { LoginControllerFactory } from '../../controllers/auth/LoginController';

export class AuthRoutesFactory {
  public static make(): AuthRoutes {
    const authController = LoginControllerFactory.make();
    return new AuthRoutes(authController);
  }
}
