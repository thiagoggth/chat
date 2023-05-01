import event from '../../../modules/@shared/services/event';
import { ChannelRepository } from '../../../modules/channel/repositories/ChannelRepository';
import { PostRepository } from '../../../modules/post/repositories/PostRepository';
import { CreatePostUseCase } from '../../../modules/post/useCases/CreatePostUseCase';
import { UserRepository } from '../../../modules/user/repositories/UserRepository';

export class CreatePostUseCaseFactory {
  public static make(): CreatePostUseCase {
    return new CreatePostUseCase(
      new PostRepository(),
      new UserRepository(),
      new ChannelRepository(),
      event
    );
  }
}
