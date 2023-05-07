import { BaseEntity, BaseEntityProps } from '../../../@shared/domain/entities/BaseEntity';
import IAggregateRoot from '../../../@shared/domain/entities/IAggregateRoot';
import { Id } from '../../../@shared/domain/valueObjects/Id';

interface ChannelProps extends BaseEntityProps {
  name?: string;
  type?: string;
  membersIds: Id[];
}

/**
 * Direct: Direct message between users
 * Public: Visible for all users of channel.
 * Private: Only added users on channel
 */
export enum ChannelType {
  DIRECT = 'DirectMessages',
  PUBLIC = 'PublicMessages',
  PRIVATE = 'PrivateMessage'
}

const MINIMUM_CHANNEL_MEMBERS = 2;
const MAX_DIRECT_CHANNEL_MEMBERS = 2;

export class Channel extends BaseEntity implements IAggregateRoot {
  public name?: string;
  public type: ChannelType;
  private _membersIds: Id[];

  public constructor(props: ChannelProps) {
    super(props);
    this.name = props.name;
    this.type = props.type ? this.convertStringToType(props.type) : ChannelType.PUBLIC;
    this._membersIds = props.membersIds;
    this.validate();
  }

  private convertStringToType(channelTypeString: string): ChannelType {
    const hasValue = Object.values(ChannelType).includes(channelTypeString as any);
    if (!hasValue) throw new Error('Invalid channel type');
    return channelTypeString as ChannelType;
  }

  private validate() {
    if (this.type !== ChannelType.DIRECT && !this.name) {
      throw new Error('name are required');
    }

    if (this._membersIds.length < MINIMUM_CHANNEL_MEMBERS) {
      throw new Error(`Channel must have at least ${MINIMUM_CHANNEL_MEMBERS} members`);
    }

    if (this.type === ChannelType.DIRECT && this._membersIds.length > MAX_DIRECT_CHANNEL_MEMBERS) {
      throw new Error(`Direct channel must have only ${MAX_DIRECT_CHANNEL_MEMBERS} members`);
    }

    for (const [index, memberId] of this._membersIds.entries()) {
      const duplicates = this._membersIds.filter(
        (memberIdFilter, indexFilter) =>
          indexFilter !== index && memberId.value === memberIdFilter.value
      );
      if (duplicates?.length > 0) throw new Error(`members[${index}]: has duplicated`);
    }
  }

  public get membersIds(): readonly Id[] {
    return this._membersIds;
  }
}
