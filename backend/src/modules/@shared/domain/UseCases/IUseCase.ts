export interface IUseCase<Input, Output> {
  handler(dto: Input): Output;
}
