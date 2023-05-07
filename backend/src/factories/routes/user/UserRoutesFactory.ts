import { UserRoutes } from '../../../app/routes/user.routes';
import { ListUsersController } from '../../../modules/user/controllers/ListUsersController';
import { CreateUserControllerFactory } from '../../controllers/user/CreateUserControllerFactory';

export class UserRoutesFactory {
  public static make(): UserRoutes {
    const createUserController = CreateUserControllerFactory.make();
    const listUserController = new ListUsersController();
    return new UserRoutes(createUserController, listUserController);
  }
}
