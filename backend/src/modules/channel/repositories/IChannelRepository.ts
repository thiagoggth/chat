import { Id } from '../../@shared/domain/valueObjects/Id';
import { Channel } from '../domain/entities/Channel';

export interface IChannelRepository {
  create(channel: Channel): Promise<void>;
  findById(id: Id): Promise<Channel | undefined>;
}
