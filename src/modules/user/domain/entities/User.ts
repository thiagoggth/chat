import { BaseEntity, BaseEntityProps } from '../../../@shared/domain/entities/BaseEntity';
import IAggregateRoot from '../../../@shared/domain/entities/IAggregateRoot';
import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';

export interface UserProps extends BaseEntityProps {
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
}

export class User extends BaseEntity implements IAggregateRoot {
  public name: string;
  private _email: Email;
  public readonly password: Password;
  public emailVerified: boolean;

  public constructor(props: UserProps) {
    super(props);
    this.emailVerified = props.emailVerified || false;
    this.name = props.name;
    this._email = new Email(props.email);
    this.password = new Password(props.password);
  }

  public get email(): string {
    return this._email.value;
  }
}
