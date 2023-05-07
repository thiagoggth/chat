import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';
import configs from '../../configs';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const validateToken = async (token?: string) => {
  try {
    if (!token) throw new UnauthorizedError('restricted access');
    const replacedToken = token.replace('Bearer ', '');
    const user = verify(replacedToken, configs.SECRET);
    return user;
  } catch (error: any) {
    switch (error.constructor) {
      case TokenExpiredError:
        throw new UnauthorizedError('token expired');
      case JsonWebTokenError:
        throw new UnauthorizedError('invalid token');
      default:
        throw error;
    }
  }
};
