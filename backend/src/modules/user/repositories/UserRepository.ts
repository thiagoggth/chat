import { Repository } from 'typeorm';
import { App } from '../../../App';
import { Id } from '../../@shared/domain/valueObjects/Id';
import { UserSchema } from '../Schemas/UserSchema';
import { User } from '../domain/entities/User';
import { UserMapper } from '../mappers/UserMapper';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  private _repository: Repository<UserSchema>;
  public constructor() {
    this._repository = App.datSource.getRepository(UserSchema);
  }

  public async find(): Promise<UserSchema[]> {
    const users = await this._repository.find({
      select: { email: true, emailVerified: true, id: true, name: true }
    });
    return users;
  }

  public async create(user: User): Promise<void> {
    await this._repository.save(UserMapper.toSchema(user));
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFound = await this._repository.findOneBy({ email });
    return userFound ? UserMapper.toDomain(userFound) : undefined;
  }

  public async findById(id: Id): Promise<User | undefined> {
    const userFound = await this._repository.findOneBy({ id: id.value });
    return userFound ? UserMapper.toDomain(userFound) : undefined;
  }
}
