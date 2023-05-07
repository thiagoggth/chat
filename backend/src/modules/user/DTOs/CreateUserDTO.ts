import { User } from '../domain/entities/User';

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export class CreateUserOutput {
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
