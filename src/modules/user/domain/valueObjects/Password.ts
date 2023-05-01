import IValueObject from '../../../@shared/domain/valueObjects/IValueObject';
import { EncryptService } from '../../../auth/services/EncryptService';
import { IEncryptService } from '../../../auth/services/IEncryptService';

export class Password implements IValueObject {
  public readonly value: string;
  private readonly encryptService: IEncryptService;

  public constructor(password: string) {
    this.value = password;
    this.encryptService = new EncryptService();
    if (this.encryptService.isHash(this.value)) return;
    this.validate();
    this.value = this.encryptService.hash(password);
  }

  private validate() {
    this.validateAreEmpty();
    this.validateMinCharacters();
    this.validateRequiredCharacters();
  }

  private validateAreEmpty() {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Password should not be empty');
    }
  }

  private validateMinCharacters() {
    const MINIMUM_LENGTH = 8;
    if (this.value.length < MINIMUM_LENGTH) {
      throw new Error('Password must be at least 8 characters');
    }
  }

  private validateRequiredCharacters() {
    const REQUIRED_CHARACTER_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/;
    if (!REQUIRED_CHARACTER_REGEX.test(this.value)) {
      throw new Error(
        'Password must include at least one uppercase letter, one lowercase letter, one number and one special character'
      );
    }
  }

  public checkPassword(password: string): boolean {
    return this.encryptService.compare(password, this.value);
  }
}
