export class InvalidValuesError extends Error {
  public constructor(public propName: string, message: string) {
    super(message);
  }
}
