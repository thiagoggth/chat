import { Post } from '../domain/entities/Post';

export interface IPostRepository {
  create(post: Post): Promise<void>;
}
