import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { validateToken } from '../utils/validateToken';

export class AuthorizeIoMiddleware {
  public static async execute(
    { request, handshake, data }: Socket,
    next: (err?: ExtendedError | undefined) => void
  ) {
    const token = handshake.auth.token;
    try {
      const user = await validateToken(token);
      data.requestUser = user;
      next();
    } catch (error: any) {
      return next(error);
    }
  }
}
