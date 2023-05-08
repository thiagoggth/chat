import { IUseCase } from '../../@shared/domain/UseCases/IUseCase';
import { Id } from '../../@shared/domain/valueObjects/Id';
import { NotFoundError } from '../../@shared/errors/NotFoundError';
import { IUserRepository } from '../../user/repositories/IUserRepository';
import { CreateChannelInput, CreateChannelOutput } from '../DTOs/CreateChannelDTO';
import { Channel } from '../domain/entities/Channel';
import { IChannelRepository } from '../repositories/IChannelRepository';

export class CreateChannelUseCase
  implements IUseCase<CreateChannelInput, Promise<CreateChannelOutput>>
{
  public constructor(
    private channelRepository: IChannelRepository,
    private _userRepository: IUserRepository
  ) {}

  public async handler(dto: CreateChannelInput): Promise<CreateChannelOutput> {
    const membersIds = await this._validateMembersAndGetIds(dto.members, dto.requestUserId);

    const newChannel = new Channel({
      type: dto.type,
      name: dto.name,
      membersIds
    });

    await this.channelRepository.create(newChannel);

    return new CreateChannelOutput(newChannel);
  }

  private async _validateMembersAndGetIds(members: string[], requestUser: string): Promise<Id[]> {
    const ids: Id[] = [];
    const requestUserId = new Id(requestUser);
    const userFound = await this._userRepository.findById(requestUserId);
    if (!userFound) throw new NotFoundError('requestUser', `request user User not found`);
    ids.push(requestUserId);

    let i = 0;
    for (const member of members) {
      const userId = new Id(member);
      const userFound = await this._userRepository.findById(userId);
      if (!userFound) throw new NotFoundError(`members[${i}]`, `User not found`);
      ids.push(userId);
      i++;
    }

    return ids;
  }
}
