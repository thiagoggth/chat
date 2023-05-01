import { CreateUserController } from '../../../modules/user/controllers/CreateUserController';
import { CreateUserUseCaseFactory } from '../../useCases/user/CreateUserUseCaseFactory';

export class CreateUserControllerFactory {
  public static make(): CreateUserController {
    return new CreateUserController(CreateUserUseCaseFactory.make());
  }
}
