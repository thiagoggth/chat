import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostSchema {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public message!: string;

  @Column()
  public channelId!: string;

  @Column()
  public createdById!: string;
}
