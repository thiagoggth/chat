import { v4 as uuidv4 } from 'uuid';
import IValueObject from './IValueObject';

export class Id implements IValueObject {
  public readonly value: string;

  public constructor(id?: string) {
    this.value = id || uuidv4();
    this.validateIsValidUUID();
  }

  private validateIsValidUUID(): void {
    const UUID_REGEX =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(this.value)) throw new Error('Invalid id value');
  }

  public toJSON() {
    return this.value;
  }

  public valueOf() {
    return this.value;
  }
}
