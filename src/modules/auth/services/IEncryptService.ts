export interface IEncryptService {
  hash(password: string): string;
  compare(password: string, hash: string): boolean;
  isHash(str: string): boolean;
}
