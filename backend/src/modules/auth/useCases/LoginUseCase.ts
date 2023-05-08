import { IUseCase } from '../../@shared/domain/UseCases/IUseCase';
import { Email } from '../../user/domain/valueObjects/Email';
import { IUserRepository } from '../../user/repositories/IUserRepository';
import { LoginInput, LoginOutput, UserProtected } from '../DTOs/LoginDTOs';
import { UserOrPasswordWrongError } from '../errors/UserOrPasswordWrogError';
import { IAuthService } from '../services/IAuthService';

export class LoginUseCase implements IUseCase<LoginInput, Promise<LoginOutput>> {
  private userRepository: IUserRepository;
  private authService: IAuthService;

  public constructor(userRepository: IUserRepository, authService: IAuthService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async handler(dto: LoginInput): Promise<LoginOutput> {
    const email = new Email(dto.email);
    const userFound = await this.userRepository.findByEmail(email.value);

    if (!userFound || !userFound.password.checkPassword(dto.password)) {
      throw new UserOrPasswordWrongError('email', 'User or password wrong');
    }

    const userProtected: UserProtected = {
      email: userFound.email,
      emailVerified: userFound.emailVerified,
      id: userFound.id.value,
      name: userFound.name
    };

    return {
      token: this.authService.generateJWTToken(userProtected),
      user: userProtected
    };
  }
}
