import { IEventData } from '../../services/IEvent';
import { IUseCase } from './IUseCase';

export interface IEventUseCase<T> extends IUseCase<IEventData<T>, Promise<void>> {}
