import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { ValidatorLength, ValidatorLengthHandler } from './ValidatorLength';

describe('ValidatorLength', () => {

  it('should return min char error for the string value', () => {
    expect(
      new ValidatorLengthHandler(new ValidatorLength(3)).run(new FormContext(), {}, { title: 'Name' } as BaseField, 'Su')
    ).toEqual({ 'error': 'Name must be min 3 characters long.', 'value': 'Su' });
  });

  it('should return max char error for the string value', () => {
    expect(
      new ValidatorLengthHandler(new ValidatorLength(0, 1)).run(new FormContext(), {}, { title: 'Name' } as BaseField, 'Su')
    ).toEqual({ 'error': 'Name must be max 1 characters long.', 'value': 'Su' });
  });

  it('should return min char error for the string value', () => {
    expect(
      new ValidatorLengthHandler(new ValidatorLength(3)).run(new FormContext(), {}, { title: 'Name' } as BaseField, [{}, {}])
    ).toEqual({ 'error': 'Name must be min 3 items long.', 'value': [{}, {}] });
  });

  it('should return max char error for the string value', () => {
    expect(
      new ValidatorLengthHandler(new ValidatorLength(0, 1)).run(new FormContext(), {}, { title: 'Name' } as BaseField, [{}, {}])
    ).toEqual({ 'error': 'Name must be max 1 items long.', 'value': [{}, {}] });
  });

});
