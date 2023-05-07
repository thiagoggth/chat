import { Id } from '../../@shared/domain/valueObjects/Id';
import { User } from '../domain/entities/User';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: Id): Promise<User | undefined>;
}
