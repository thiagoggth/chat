import { ChannelRoutes } from '../../../app/routes/channel.routes';
import { CreateChannelControllerFactory } from '../../controllers/channel/CreateChannelControllerFactory';

export class ChannelRoutesFactory {
  public static make(): ChannelRoutes {
    const createChannelController = CreateChannelControllerFactory.make();
    return new ChannelRoutes(createChannelController);
  }
}
