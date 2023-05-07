import { ChannelRepository } from '../../../modules/channel/repositories/ChannelRepository';
import { CreateChannelUseCase } from '../../../modules/channel/useCases/CreateChannelUseCase';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';

export class CreateChannelUseCaseFactory {
  public static make(): CreateChannelUseCase {
    return new CreateChannelUseCase(new ChannelRepository(), new UserRepository());
  }
}
