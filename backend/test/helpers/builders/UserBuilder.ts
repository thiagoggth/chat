import { User } from '../../../src/modules/user/domain/entities/User';

export class UserBuilder {
  public name!: string;
  public email!: string;
  public password!: string;
  public emailVerified?: boolean;

  public createValidUser() {
    this.setEmail('exeple@email.com').setName('Exemple Name').setPassword('ExemplePassword@123');
    return this;
  }

  public setName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  public setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  public setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  public setEmailVerified(value: boolean) {
    this.emailVerified = value;
  }

  public build(): User {
    return new User({
      email: this.email,
      name: this.name,
      password: this.password,
      emailVerified: this.emailVerified
    });
  }
}
