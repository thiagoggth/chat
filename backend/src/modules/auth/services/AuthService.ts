import { sign } from 'jsonwebtoken';
import configs from '../../../configs';
import { IAuthService } from './IAuthService';

export class AuthService implements IAuthService {
  public generateJWTToken<T = any>(data: any): string {
    const token = sign(data, configs.SECRET, { expiresIn: '1d' });
    return token;
  }
}
