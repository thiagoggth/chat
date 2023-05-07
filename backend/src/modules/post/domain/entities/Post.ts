import { BaseEntity, BaseEntityProps } from '../../../@shared/domain/entities/BaseEntity';
import IAggregateRoot from '../../../@shared/domain/entities/IAggregateRoot';
import { Id } from '../../../@shared/domain/valueObjects/Id';

interface PostProps extends BaseEntityProps {
  message: string;
  channelId: Id;
  userId: Id;
}

export class Post extends BaseEntity implements IAggregateRoot {
  public readonly message: string;
  public readonly channelId: Id;
  public readonly userId: Id;

  public constructor(props: PostProps) {
    super(props);
    this.message = props.message;
    this.channelId = props.channelId;
    this.userId = props.userId;
  }
}
