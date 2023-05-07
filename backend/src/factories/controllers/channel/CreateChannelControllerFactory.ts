import { CreateChannelController } from '../../../modules/channel/controllers/CreateChannelController';
import { CreateChannelUseCaseFactory } from '../../useCases/channel/CreateChannelUseCaseFactory';

export class CreateChannelControllerFactory {
  public static make(): CreateChannelController {
    return new CreateChannelController(CreateChannelUseCaseFactory.make());
  }
}
