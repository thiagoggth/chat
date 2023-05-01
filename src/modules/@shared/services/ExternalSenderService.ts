import { App } from '../../../App';
import { IExternalSenderService, SenderProps } from './IExternalSernderService';

export class ExternalSenderService implements IExternalSenderService {
  public async send({ targetId, eventName, data }: SenderProps): Promise<void> {
    App.io.to(targetId).emit(eventName, data);
  }
}
