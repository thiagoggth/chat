import { mock } from 'jest-mock-extended';
import { IUserRepository } from '../../src/modules/user/repositories/IUserRepository';
import { CreateUserUseCase } from '../../src/modules/user/useCases/CreateUsersUseCase';
import { UserBuilder } from '../helpers/builders/UserBuilder';

describe('Caso de uso: Criação de usuário', () => {
  const getMocks = () => {
    return {
      mockUserRepository: mock<IUserRepository>()
    };
  };

  it('Deve obter sucesso ao criar um usuário', async () => {
    const { mockUserRepository } = getMocks();
    const createUserUseCase = new CreateUserUseCase(mockUserRepository);
    const userCreated = await createUserUseCase.handler({
      email: 'test@email.com',
      name: 'Test',
      password: 'strongPassword@123'
    });

    expect(userCreated.name).toEqual('Test');
    expect(userCreated.email).toEqual('test@email.com');
    expect(userCreated.emailVerified).toBeFalsy();
  });

  it('Deve dar erro caso o usuário já esteja cadastrado', async () => {
    const { mockUserRepository } = getMocks();
    mockUserRepository.findByEmail.mockResolvedValueOnce(
      new UserBuilder().createValidUser().build()
    );
    const createUserUseCase = new CreateUserUseCase(mockUserRepository);
    const fc = async () => {
      await createUserUseCase.handler({
        email: 'test@email.com',
        name: 'Test',
        password: 'strongPassword@123'
      });
    };

    await expect(fc).rejects.toThrow('User already exists');
  });
});
