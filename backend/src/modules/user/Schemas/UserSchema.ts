import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserSchema {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column({ unique: true })
  public email!: string;

  @Column()
  public password!: string;

  @Column()
  public emailVerified!: boolean;

  @Column({ unique: true, nullable: true })
  public socketId?: string;
}
