import { Id } from '../valueObjects/Id';

export interface BaseEntityProps {
  id?: Id;
}

export class BaseEntity {
  private _id: Id;
  private _createdAt: Date;
  private _updatedAt: Date;

  public constructor(props: BaseEntityProps) {
    this._id = props.id || new Id();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public get id(): Id {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
