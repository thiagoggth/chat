import { Id } from '../../@shared/domain/valueObjects/Id';
import { Post } from '../domain/entities/Post';
import { PostSchema } from '../schemas/PostSchema';

export class PostMapper {
  public static toDomain(post: PostSchema): Post {
    return new Post({
      id: new Id(post.id),
      channelId: new Id(post.channelId),
      message: post.message,
      userId: new Id(post.createdById)
    });
  }

  public static toSchema(user: Post): PostSchema {
    return {
      channelId: user.channelId.value,
      createdById: user.userId.value,
      id: user.id.value,
      message: user.message
    };
  }
}
