import { UserBuilder } from '../helpers/builders/UserBuilder';

class Dictionary<TKey extends string | number | symbol, TValue> {
  private _values: any = {};

  public add(key: TKey, value: TValue): void {
    this._values[key] = value;
  }

  public get values(): Record<TKey, TValue> {
    return this._values;
  }
}

type Func<TInput> = (input: TInput) => string;

class ItemDictionary<TValue = any> {
  public constructor(public label: string, public transform: Func<TValue>) {}
}

const dictionary = new Dictionary<string, ItemDictionary>();
dictionary.add('test', new ItemDictionary<string>('Test', (test) => test));

describe('Entidade: Usuario', () => {
  it('Deve instanciar um usuário com o e-mail valido', () => {
    const builder = new UserBuilder();
    const user = builder.createValidUser().build();
    expect(user.email).toBe(builder.email);
  });

  it('Deve dar erro ao instanciar um usuário com email invalido', () => {
    const functionToTrow = () =>
      new UserBuilder().createValidUser().setEmail('userExample.com').build();
    expect(functionToTrow).toThrow('Invalid e-mail address');
  });

  it('Deve dar erro ao instanciar um usuário sem email', () => {
    const functionToTrow = () => new UserBuilder().createValidUser().setEmail('   ').build();
    expect(functionToTrow).toThrow('Invalid e-mail address');
  });

  it('Deve validar a senha correta', () => {
    const userBuilder = new UserBuilder();
    const user = userBuilder.createValidUser().build();
    expect(user.password.checkPassword(userBuilder.password)).toBeTruthy();
  });

  it('Deve validar a senha incorreta', () => {
    const user = new UserBuilder().createValidUser().build();
    expect(user.password.checkPassword('wrongPassword')).toBeFalsy();
  });

  it('Deve instanciar um usuário com a senha valida', () => {
    const user = new UserBuilder().createValidUser().setPassword('strongPassword@123').build();
    expect(user.password.checkPassword('strongPassword@123')).toBeTruthy();
  });

  it('Deve dar erro ao instanciar um usuário com senha em branco', () => {
    const fc = () => new UserBuilder().createValidUser().setPassword('    ').build();
    expect(fc).toThrow('Password should not be empty');
  });

  it('Deve dar erro caso a senha tenha menos de 8 dígitos', () => {
    const fc = () => new UserBuilder().createValidUser().setPassword('teste').build();
    expect(fc).toThrow('Password must be at least 8 characters');
  });

  it('Deve dar erro caso a senha não tenha os caracteres obrigatórios', () => {
    const fc = () => new UserBuilder().createValidUser().setPassword('12345678').build();
    expect(fc).toThrow(
      'Password must include at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });
});
