import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserSchema } from '../../user/Schemas/UserSchema';

@Entity({ name: 'channel' })
export class ChannelSchema {
  @PrimaryColumn()
  public id!: string;

  @Column({ nullable: true })
  public name?: string;

  @Column()
  public type!: string;

  @ManyToMany(() => UserSchema, { eager: true })
  @JoinTable({ name: 'channelMembersUsers' })
  public members!: UserSchema[];
}
