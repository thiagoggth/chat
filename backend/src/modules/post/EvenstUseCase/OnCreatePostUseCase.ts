import { IEventUseCase } from '../../@shared/domain/UseCases/IEventUseCase';
import { IEventData } from '../../@shared/services/IEvent';
import { IExternalSenderService } from '../../@shared/services/IExternalSernderService';
import { ICashUserRepository } from '../../user/repositories/ICashUserRepository';
import { CreatePostOutput } from '../DTOs/CreatePostDtos';

export class OnCreatePostUseCase implements IEventUseCase<CreatePostOutput> {
  public constructor(
    private externalSenderService: IExternalSenderService,
    private cashUserRepository: ICashUserRepository
  ) {}

  public async handler(eventData: IEventData<CreatePostOutput>): Promise<void> {
    try {
      const users = await this.cashUserRepository.getUsersByChannelId(eventData.data.channelId);
      const usersToNotify: string[] = users
        .filter(({ id, targetId }) => id !== eventData.data.requestUserId && targetId)
        .map((user) => user.targetId!);
      this.notifyUser(eventData, usersToNotify);
    } catch (error: any) {
      console.error(error);
    }
  }

  private notifyUser(eventData: IEventData<CreatePostOutput>, targetId: string[]) {
    this.externalSenderService.send({
      eventName: 'postCreated',
      data: eventData,
      targetId
    });
  }
}
