export interface IAuthService {
  generateJWTToken<T = any>(data: any): string;
}
