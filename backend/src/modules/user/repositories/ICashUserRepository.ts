export type UserCached = {
  id: string;
  targetId?: string;
};

export interface ICashUserRepository {
  getUserTargetIdByUserId(userId: string): Promise<string | undefined>;
  getUsersByChannelId(channelId: string): Promise<UserCached[]>;
}
