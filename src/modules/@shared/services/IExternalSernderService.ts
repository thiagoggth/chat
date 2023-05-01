export interface SenderProps {
  eventName: string;
  data: any;
  targetId: string | string[];
}

export interface IExternalSenderService {
  send(senderProps: SenderProps): Promise<void>;
}
