import { Repository } from 'typeorm';
import { App } from '../../../App';
import { Post } from '../domain/entities/Post';
import { PostMapper } from '../mappers/PostMapper';
import { PostSchema } from '../schemas/PostSchema';
import { IPostRepository } from './IPostRepository';

export class PostRepository implements IPostRepository {
  private _repository: Repository<PostSchema>;

  public constructor() {
    this._repository = App.datSource.getRepository(PostSchema);
  }

  public async create(post: Post): Promise<void> {
    await this._repository.save(PostMapper.toSchema(post));
  }

  public async listByChannelId(channelId: string): Promise<PostSchema[]> {
    const users = this._repository.find({ where: { channelId } });
    return users;
  }
}
