import { adder } from '../index';

describe('adder', () => {
  it('expect to return 4', () => {
    const a = 3;
    const b = 1;

    const expectation = 4;
    const actual = adder(a, b);

    expect(actual).toBe(expectation);
  });
});
