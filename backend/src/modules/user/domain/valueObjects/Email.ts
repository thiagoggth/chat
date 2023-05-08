import IValueObject from '../../../@shared/domain/valueObjects/IValueObject';
import { InvalidValuesError } from '../../../@shared/errors/InvalidValuesError';

export class Email implements IValueObject {
  public readonly value: string;

  public constructor(email: string) {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(email)) {
      throw new InvalidValuesError('email', 'Invalid e-mail address');
    }

    this.value = email;
  }
}
