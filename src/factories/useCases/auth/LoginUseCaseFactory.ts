import { AuthService } from '../../../modules/auth/services/AuthService';
import { LoginUseCase } from '../../../modules/auth/useCases/LoginUseCase';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';

export class LoginUseCaseFactory {
  public static make(): LoginUseCase {
    return new LoginUseCase(new UserRepository(), new AuthService());
  }
}
