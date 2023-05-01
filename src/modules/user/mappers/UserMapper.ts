import { Id } from '../../@shared/domain/valueObjects/Id';
import { UserSchema } from '../Schemas/UserSchema';
import { User } from '../domain/entities/User';

export class UserMapper {
  public static toDomain(user: UserSchema): User {
    return new User({
      id: new Id(user.id),
      email: user.email,
      name: user.name,
      password: user.password,
      emailVerified: user.emailVerified
    });
  }

  public static toSchema(userSchema: User): UserSchema {
    return {
      email: userSchema.email,
      emailVerified: userSchema.emailVerified,
      id: userSchema.id.value,
      name: userSchema.name,
      password: userSchema.password.value
    };
  }
}
