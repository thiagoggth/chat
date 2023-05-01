import EventEmitter from 'events';
import { IEventUseCase } from '../domain/UseCases/IEventUseCase';
import { IEvent, IEventData } from './IEvent';

class Event implements IEvent {
  private _emitter: EventEmitter;

  public constructor() {
    this._emitter = new EventEmitter();
  }

  public emit<T = any>(eventName: string, data?: IEventData<T> | undefined): void {
    this._emitter.emit(eventName, data);
  }

  public on<T = any>(eventName: string, useCase: IEventUseCase<T>): void {
    this._emitter.on(eventName, (data) => useCase.handler(data));
  }
}

export default new Event();
