import { UserRoutes } from '../../../app/routes/user.routes';
import { CreateUserControllerFactory } from '../../controllers/user/CreateUserControllerFactory';

export class UserRoutesFactory {
  public static make(): UserRoutes {
    const createUserController = CreateUserControllerFactory.make();
    return new UserRoutes(createUserController);
  }
}
