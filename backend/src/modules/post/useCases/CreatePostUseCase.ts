import { IUseCase } from '../../@shared/domain/UseCases/IUseCase';
import { Id } from '../../@shared/domain/valueObjects/Id';
import { EventData, IEvent } from '../../@shared/services/IEvent';
import { IChannelRepository } from '../../channel/repositories/IChannelRepository';
import { IUserRepository } from '../../user/repositories/IUserRepository';
import { CreatePostInput, CreatePostOutput } from '../DTOs/CreatePostDtos';
import { Post } from '../domain/entities/Post';
import { IPostRepository } from '../repositories/IPostRepository';

export class CreatePostUseCase implements IUseCase<CreatePostInput, Promise<CreatePostOutput>> {
  public constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository,
    private channelRepository: IChannelRepository,
    private event: IEvent
  ) {}

  public async handler({ message, ...dto }: CreatePostInput): Promise<CreatePostOutput> {
    const channelId = new Id(dto.channelId);
    await this.validateExistsChannel(channelId);

    const userId = new Id(dto.requestUserId);
    await this.validateExistsUser(userId);

    const newPost = new Post({ channelId, userId, message });
    await this.postRepository.create(newPost);

    const output = new CreatePostOutput(newPost);
    this.event.emit<CreatePostOutput>('postCreated', new EventData(output));

    return output;
  }

  private async validateExistsChannel(id: Id): Promise<void> {
    const channelFound = await this.channelRepository.findById(id);
    if (!channelFound) throw new Error('channel not found');
  }

  private async validateExistsUser(id: Id): Promise<void> {
    const userFound = await this.userRepository.findById(id);
    if (!userFound) throw new Error('User not found');
  }
}
