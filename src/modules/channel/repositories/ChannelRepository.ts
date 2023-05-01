import { Repository } from 'typeorm';
import { App } from '../../../App';
import { Id } from '../../@shared/domain/valueObjects/Id';
import { Channel } from '../domain/entities/Channel';
import { ChannelMapper } from '../mappers/ChannelMapper';
import { ChannelSchema } from '../schemas/ChannelSchema';
import { IChannelRepository } from './IChannelRepository';

export class ChannelRepository implements IChannelRepository {
  private _repository: Repository<ChannelSchema>;

  public constructor() {
    this._repository = App.datSource.getRepository(ChannelSchema);
  }

  public async create(channel: Channel): Promise<void> {
    const channelSchema = ChannelMapper.toSchema(channel);
    const schemaToSave = this._repository.create(channelSchema);
    await this._repository.save(schemaToSave);
  }

  public async findById(id: Id): Promise<Channel | undefined> {
    const channelFound = await this._repository.findOneBy({ id: id.value });
    return channelFound ? ChannelMapper.toDomain(channelFound) : undefined;
  }
}
