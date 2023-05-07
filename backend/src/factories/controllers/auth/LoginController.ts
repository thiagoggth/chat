import { LoginController } from '../../../modules/auth/controllers/LoginController';
import { LoginUseCaseFactory } from '../../useCases/auth/LoginUseCaseFactory';

export class LoginControllerFactory {
  public static make(): LoginController {
    return new LoginController(LoginUseCaseFactory.make());
  }
}
