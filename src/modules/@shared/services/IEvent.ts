import { IEventUseCase } from '../domain/UseCases/IEventUseCase';

export interface IEventData<T> {
  dateOcurred: Date;
  data: T;
}

export class EventData<T> implements IEventData<T> {
  public dateOcurred: Date;

  public constructor(public data: T) {
    this.dateOcurred = new Date();
  }
}

export interface IEvent {
  emit<T = any>(eventName: string, data?: IEventData<T>): void;
  on<T = any>(eventName: string, useCase: IEventUseCase<T>): void;
}
