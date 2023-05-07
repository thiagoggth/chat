import { Id } from '../../@shared/domain/valueObjects/Id';
import { UserSchema } from '../../user/Schemas/UserSchema';
import { Channel } from '../domain/entities/Channel';
import { ChannelSchema } from '../schemas/ChannelSchema';

export class ChannelMapper {
  public static toDomain(channelSchema: ChannelSchema): Channel {
    return new Channel({
      id: new Id(channelSchema.id),
      name: channelSchema.name,
      type: channelSchema.type,
      membersIds: channelSchema.members.map((member) => new Id(member.id))
    });
  }

  public static toSchema(channel: Channel): ChannelSchema {
    return {
      id: channel.id.value,
      name: channel.name,
      type: channel.type,
      members: channel.membersIds.map((memberId) => ({ id: memberId.value } as UserSchema))
    };
  }
}
