import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { ValidatorURLHandler } from './ValidatorURL';

describe('ValidatorURL', () => {

  it('should return error for invalid url', () => {
    expect(
      new ValidatorURLHandler().run(new FormContext(), { title: 'Web site' } as BaseField, 'some.url')
    ).toEqual({ 'error': 'Web site is not a valid URL. Be sure it starts with HTTP or HTTPS.', 'value': 'some.url' });
  });

  it('should not return error for valid url', () => {
    expect(
      new ValidatorURLHandler().run(new FormContext(), { title: 'Web site' } as BaseField, 'https://twitter.com')
    ).toEqual({ 'value': 'https://twitter.com' });
  });
});
