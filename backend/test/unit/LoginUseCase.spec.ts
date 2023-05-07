import { mock } from 'jest-mock-extended';
import { IAuthService } from '../../src/modules/auth/services/IAuthService';
import { LoginUseCase } from '../../src/modules/auth/useCases/LoginUseCase';
import { IUserRepository } from '../../src/modules/user/repositories/IUserRepository';
import { UserBuilder } from '../helpers/builders/UserBuilder';

describe('Caso de uso: Login', () => {
  const getMocks = () => {
    return {
      mockUserRepository: mock<IUserRepository>(),
      mockAuthService: mock<IAuthService>()
    };
  };

  it('Deve obter sucesso ao fazer login', async () => {
    const { mockUserRepository, mockAuthService } = getMocks();
    const userBuilder = new UserBuilder().createValidUser();
    mockUserRepository.findByEmail.mockResolvedValue(userBuilder.build());

    const createUserUseCase = new LoginUseCase(mockUserRepository, mockAuthService);
    const result = await createUserUseCase.handler({
      email: userBuilder.email,
      password: userBuilder.password
    });

    const { user } = result as any;
    expect(user).toBeDefined();
    expect(user.password).toBeUndefined();
  });

  it('Deve falhar ao fazer login com usuário não encontrado', async () => {
    const { mockUserRepository, mockAuthService } = getMocks();
    const createUserUseCase = new LoginUseCase(mockUserRepository, mockAuthService);
    const fc = async () => {
      await createUserUseCase.handler({
        email: 'test@email.com',
        password: 'strongPassword@123'
      });
    };

    await expect(fc).rejects.toThrow('User or password wrong');
  });
});
