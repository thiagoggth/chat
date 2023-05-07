import { UserRepository } from '../../../modules/user/repositories/UserRepository';
import { CreateUserUseCase } from '../../../modules/user/useCases/CreateUsersUseCase';

export class CreateUserUseCaseFactory {
  public static make(): CreateUserUseCase {
    return new CreateUserUseCase(new UserRepository());
  }
}
