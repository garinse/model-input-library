import { Calculator } from '../src/calc/calculator';
import { expect } from 'chai';
import 'mocha';


describe('Calculation check', () => {
 
  const calc = new Calculator();

  it('checking of result of expression without brackets', () => {
    const exp = '5+3';
    const result = calc.calc(exp);
    expect(result).to.equal(8);
  });

  it('checking of result of expression with brackets', () => {
    const exp = '(6+3*2)+2*(3+1)';
    const result = calc.calc(exp);
    expect(result).to.equal(20);
  });

  it('checking of result of expression containing an infix operator', () => {
    const exp = '-5+3*2';
    const result = calc.calc(exp);
    expect(result).to.equal(1);
  });

  it('checking of result with a negative value', () => {
    const exp = '-7+3*2';
    const result = calc.calc(exp);
    expect(result).to.equal(-1);
  });

  it('checking of result of expression containing brackets and an infix operator ', () => {
    const exp = '(-5+3*2)+2*(-3+2)';
    const result = calc.calc(exp);
    expect(result).to.equal(-1);
  });

  it('checking of float result', () => {
    const exp = '(6+3*2)+2*(3+1)/3';
    const result = calc.calc(exp);
    expect(result).to.equal(14.666666666666666);
  });
 
});