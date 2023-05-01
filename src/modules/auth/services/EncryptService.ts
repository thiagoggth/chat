import bcrypt from 'bcrypt';
import { IEncryptService } from './IEncryptService';

export class EncryptService implements IEncryptService {
  public hash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  public isHash(str: string): boolean {
    return /^[$]2[ayb]\$.{56}$/.test(str);
  }
}
