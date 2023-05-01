import IValueObject from '../../../@shared/domain/valueObjects/IValueObject';

export class Email implements IValueObject {
  public readonly value: string;

  constructor(email: string) {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(email)) {
      throw new Error('Invalid e-mail address');
    }

    this.value = email;
  }
}
