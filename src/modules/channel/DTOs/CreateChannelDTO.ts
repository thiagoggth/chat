import { Channel } from '../domain/entities/Channel';

export interface CreateChannelInput {
  name?: string;
  type?: string;
  members: string[];
  requestUserId: string;
}

export class CreateChannelOutput {
  public name?: string;
  public id: string;
  public members: string[];
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(channel: Channel) {
    this.id = channel.id.value;
    this.name = channel.name;
    this.members = channel.membersIds.map((id) => id.value);
    this.createdAt = channel.createdAt;
    this.updatedAt = channel.updatedAt;
  }
}
