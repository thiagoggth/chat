import { App } from '../../../App';
import { ChannelSchema } from '../../channel/schemas/ChannelSchema';
import { ICashUserRepository, UserCached } from './ICashUserRepository';

export class CashUserRepository implements ICashUserRepository {
  public async getUsersByChannelId(channelId: string): Promise<UserCached[]> {
    const repo = App.datSource.getRepository(ChannelSchema);
    const channelFound = await repo.findOneBy({ id: channelId });
    if (!channelFound || !channelFound.members) return [];
    return channelFound.members.map((member) => ({ id: member.id, targetId: member.socketId }));
  }

  public async getUserTargetIdByUserId(userId: string): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  }
}
