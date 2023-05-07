import { Report } from './Report';

export class Result<T> {
  public data: T;
  public message?: string;
  public success: boolean;
  public errors: Report[];

  public constructor(data: T, message?: string, success = true, error: Report[] = []) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = error;
  }
}
