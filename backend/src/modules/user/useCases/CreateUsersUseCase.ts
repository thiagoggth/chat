import { IUseCase } from '../../@shared/domain/UseCases/IUseCase';
import { CreateUserInput, CreateUserOutput } from '../DTOs/CreateUserDTO';
import { User } from '../domain/entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class CreateUserUseCase implements IUseCase<CreateUserInput, Promise<CreateUserOutput>> {
  public constructor(private userRepository: IUserRepository) {}

  public async handler({ email, name, password }: CreateUserInput): Promise<CreateUserOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new Error('User already exists error');
    const newUser = new User({
      email,
      name,
      password
    });
    await this.userRepository.create(newUser);
    return {
      id: newUser.id.value,
      name: newUser.name,
      emailVerified: newUser.emailVerified,
      email: newUser.email
    };
  }
}
