import { IUseCase } from '../../@shared/domain/UseCases/IUseCase';
import { User } from '../domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class ListUserOutput {
  public id: string;
  public name: string;
  public emailVerified: boolean;
  public email: string;

  public constructor(user: User) {
    this.id = user.id.value;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.name = user.name;
  }
}

export class ListUsersUseCase implements IUseCase<undefined, Promise<ListUserOutput[]>> {
  private userRepo = new UserRepository();

  public async handler(): Promise<ListUserOutput[]> {
    const users = await this.userRepo.find();
    return users;
  }
}
