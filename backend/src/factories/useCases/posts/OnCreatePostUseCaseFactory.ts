import { ExternalSenderService } from '../../../modules/@shared/services/ExternalSenderService';
import { OnCreatePostUseCase } from '../../../modules/post/EvenstUseCase/OnCreatePostUseCase';
import { CashUserRepository } from '../../../modules/user/repositories/CashUserRepository';

export class OnCreatePostUseCaseFactory {
  public static make(): OnCreatePostUseCase {
    return new OnCreatePostUseCase(new ExternalSenderService(), new CashUserRepository());
  }
}
