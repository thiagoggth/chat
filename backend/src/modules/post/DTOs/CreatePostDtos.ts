import { Post } from '../domain/entities/Post';

export interface CreatePostInput {
  message: string;
  requestUserId: string;
  channelId: string;
}

export class CreatePostOutput {
  public id: string;
  public message: string;
  public requestUserId: string;
  public channelId: string;

  public constructor(post: Post) {
    this.message = post.message;
    this.requestUserId = post.userId.value;
    this.channelId = post.channelId.value;
    this.id = post.id.value;
  }
}
