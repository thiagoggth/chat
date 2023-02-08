import { mock } from 'jest-mock-extended';

interface IMathService {
  calcSum(numbers: number[]): number;
}

class MathService implements IMathService {
  calcSum(numbers: number[]): number {
    return numbers.reduce((prevVal, curVal) => prevVal + curVal);
  }
}

class TestUseCase {
  constructor(private mathService: IMathService) {}

  public handle() {
    const result = this.mathService.calcSum([1, 1, 1]);
    if (result > 0) return true;
    return false;
  }
}

describe('Caso de uso: exemplo de test unitários', () => {
  const getMocks = () => {
    return {
      mockMathService: mock<IMathService>()
    };
  };
  it('Deve obter valor verdadeiro no caso de uso test', async () => {
    const { mockMathService } = getMocks();
    mockMathService.calcSum.mockReturnValueOnce(3);
    expect(new TestUseCase(mockMathService).handle()).toBeTruthy();
  });

  it('Deve obter valor falso no caso de uso test', async () => {
    const { mockMathService } = getMocks();
    mockMathService.calcSum.mockReturnValueOnce(0);
    expect(new TestUseCase(mockMathService).handle()).toBeFalsy();
  });

  it('Deve obter correto ao somar os valores ', async () => {
    expect(new MathService().calcSum([1, 3, 4])).toEqual(8);
  });
});
