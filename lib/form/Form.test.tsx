import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { TextInput } from '../inputs/TextInput';
import { InputText } from '../inputs/TextInput/InputText';
import { ValidatorEmail, ValidatorLength, ValidatorNotEmpty, ValidatorURL } from '../interceptors';
import { ValidatorEmailHandler } from '../interceptors/ValidatorEmail';
import { ValidatorLengthHandler } from '../interceptors/ValidatorLength';
import { ValidatorNotEmptyHandler } from '../interceptors/ValidatorNotEmpty';
import { ValidatorURLHandler } from '../interceptors/ValidatorURL';
import { BaseField } from '../models/BaseField';
import Form, {
  generateState,
  generateStateOnFieldBlur,
  handleExtraButtonClick,
  IProps,
  IState,
  SubmitCallbackResponse
} from './Form';
import { FormContext } from './FormContext';

configure({ adapter: new Adapter() });

const context = new FormContext('en');

describe('Form', () => {

  describe('onFieldChange()', () => {

    it('should call props.onChange() with correct parameters', function () {

      const fields = [
        new TextInput(
          'someTextField',
          'Text',
        ).addInterceptor('onChange', new ValidatorLength(6, 10)),
      ];

      const onChange = jest.fn();

      const wrapper = shallow(<Form
        fields={fields}
        onChange={onChange}
        onSubmit={jest.fn()}
        submitButtonLabel="Submit"
      />);

      // there should be an InputText rendered
      expect(wrapper.find(InputText)).toHaveLength(1);

      // simulate the on change event on the input
      wrapper.find(InputText).simulate('change', 'asd');

      // onChange should be called once
      expect(onChange.mock.calls).toHaveLength(1);

      // the onChange call should receive 3 parameters
      expect(onChange.mock.calls[0]).toHaveLength(3);

      // the first parameter should be the values of the form
      expect(onChange.mock.calls[0][0]).toEqual({
        someTextField: 'asd'
      });

      // the second parameter should be the errors of the form
      expect(onChange.mock.calls[0][1]).toEqual({
        someTextField: ['Text must be min 6 characters long.']
      });

      // the third parameter should be a form context
      expect(onChange.mock.calls[0][2]).toEqual(new FormContext('en'));
    });
  });

  describe('generateState()', () => {

    it('state should contain the correct values', function () {

      const props: IProps = {
        fields: [
          new TextInput('textWithValue', 'Text With Value').setValue('This is short text value'),
          new TextInput('textWithoutValue', 'Text Without Value'),
        ],
        submitButtonLabel: 'Submit',
        onSubmit: jest.fn(),
      };

      const state = generateState(props);

      expect(state.values['textWithValue']).toBe('This is short text value');
      expect(state.values['textWithoutValue']).toBeUndefined();
    });

    describe('"validatorNotEmpty" interceptor', () => {

      it('should not be added for non-required fields', function () {

        const props: IProps = {
          fields: [
            new TextInput('nonRequiredField', 'Text Without Value'),
          ],
          submitButtonLabel: 'Submit',
          onSubmit: jest.fn(),
        };

        expect(generateState(props).interceptors['nonRequiredField'].onSubmit).toHaveLength(0);
      });

      it('should not be added for required fields if it is already in the interceptor list', function () {

        const props: IProps = {
          fields: [
            new TextInput('requiredField', 'Text With Value')
              .addInterceptor('onSubmit', new ValidatorNotEmpty())
              .require(),
          ],
          submitButtonLabel: 'Submit',
          onSubmit: jest.fn(),
        };

        // there should be just one ValidatorNotEmptyHandler in onSubmit interceptors
        expect(generateState(props).interceptors['requiredField'].onSubmit).toEqual([new ValidatorNotEmptyHandler()]);
      });

      it('should be added for required fields if it is not already in the interceptor list', function () {

        const props: IProps = {
          fields: [
            new TextInput('requiredField', 'Text With Value')
              .addInterceptor('onSubmit', new ValidatorLength(10))
              .require(),
          ],
          submitButtonLabel: 'Submit',
          onSubmit: jest.fn(),
        };

        // there should be one ValidatorNotEmptyHandler prepended to the onSubmit interceptors
        expect(generateState(props).interceptors['requiredField'].onSubmit).toEqual(
          [
            new ValidatorNotEmptyHandler(),
            new ValidatorLengthHandler(new ValidatorLength(10))
          ]
        );
      });
    });

    it('state should contain correct interceptor handlers', function () {

      const props: IProps = {
        fields: [
          new TextInput('emailField', 'Email')
            .addInterceptor('onChange', new ValidatorLength(10, 20))
            .addInterceptor('onSubmit', new ValidatorEmail()),
          new TextInput('urlField', 'Web site')
            .addInterceptor('onChange', new ValidatorURL())
            .addInterceptor('onBlur', new ValidatorLength(5)),
          new TextInput('textField', 'First name')
            .addInterceptor('onBlur', new ValidatorNotEmpty())
            .addInterceptor('onSubmit', new ValidatorLength(2)),
        ],
        submitButtonLabel: 'Submit',
        onSubmit: jest.fn(),
      };

      const state = generateState(props);

      expect(state.interceptors['emailField'].onChange).toEqual([new ValidatorLengthHandler(new ValidatorLength(10, 20))]);
      expect(state.interceptors['emailField'].onSubmit).toEqual([new ValidatorEmailHandler()]);

      expect(state.interceptors['urlField'].onChange).toEqual([new ValidatorURLHandler()]);
      expect(state.interceptors['urlField'].onBlur).toEqual([new ValidatorLengthHandler(new ValidatorLength(5))]);

      expect(state.interceptors['textField'].onBlur).toEqual([new ValidatorNotEmptyHandler()]);
      expect(state.interceptors['textField'].onSubmit).toEqual([new ValidatorLengthHandler(new ValidatorLength(2))]);
    });

  });

  describe('generateStateOnFieldBlur()', () => {

    it('should return no error if there is no existing error and the onBlur interceptors return no error', () => {
      const state: IState = {
        context,
        errors: {},
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: {},
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      });
    });

    it('should return previous errors if there are existing errors and the onBlur interceptors return no error', () => {
      const state: IState = {
        context,
        errors: { 'a': ['Fix this!'] },
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: { 'a': ['Fix this!'] },
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      });
    });

    it('should return combined errors if there are existing errors and the onBlur interceptors return error too', () => {
      const state: IState = {
        context,
        errors: { 'a': ['Fix this!'] },
        interceptors: {
          'a': {
            onBlur: [new ValidatorNotEmptyHandler()],
            onChange: [],
            onSubmit: [],
          }
        },
        values: { a: 0, b: 'b', c: false },
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: { 'a': ['Fix this!', 'A cannot be empty.'] },
        interceptors: {
          'a': {
            onBlur: [new ValidatorNotEmptyHandler()],
            onChange: [],
            onSubmit: [],
          }
        },
        values: { a: 0, b: 'b', c: false },
      });
    });

  });

  describe('handleExtraButtonClick()', () => {

    const fields = [
      new TextInput('a', 'A', 'Aaa').addInterceptor('onSubmit', new ValidatorEmail()).require(),
      new TextInput('b', 'B', 'Bbb').addInterceptor('onSubmit', new ValidatorLength(6, 10)).require(),
    ];

    const props: IProps = {
      fields,
      loading: false,
      onSubmit: () => {
      },
      submitButtonLabel: 'Hit me!',
    };

    const state: IState = {
      context,
      errors: {},
      interceptors: {},
      values: { a: 1, b: 'b', c: false },
    };

    it('should pass existing values and errors to the button callback when the button is clicked', () => {

      const callback = jest.fn();
      const callbackCalls = callback.mock.calls;

      handleExtraButtonClick(props, state, callback, true);

      expect(callbackCalls.length).toBe(1);
      expect(callbackCalls[0].length).toBe(3);
      expect(callbackCalls[0][0]).toEqual({ a: 1, b: 'b', c: false });
      expect(callbackCalls[0][1]).toEqual({});
      expect(callbackCalls[0][2]).toEqual(new FormContext());
    });

    it('should return the same state if the callback returns nothing', () => {

      const callback = jest.fn();
      const response = handleExtraButtonClick(props, state, callback, true);
      expect(response).toEqual({
        'context': { 'language': 'en' },
        'errors': {},
        'interceptors': {},
        'values': { 'a': 1, 'b': 'b', 'c': false }
      });
    });

    it('should return a state that contains the values that the callback returns', () => {

      const callback = jest.fn((context: FormContext, values: { [key: string]: any }, errors: { [key: string]: string[] }): SubmitCallbackResponse => {
        return {
          values: { a: 20, b: 'b', c: false }
        };
      });

      const response = handleExtraButtonClick(props, state, callback, true);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        values: { a: 20, b: 'b', c: false },
      });
    });

    it('should return a state that contains the errors that the callback returns', () => {

      const state: IState = {
        context,
        errors: { 'a': ['The error that the form passes.'] },
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      };

      const callback = jest.fn((context: FormContext, values: { [key: string]: any }, errors: { [key: string]: string[] }): SubmitCallbackResponse => {
        return {
          errors: { 'a': ['You did not see it coming, did you?'] },
        };
      });

      const response = handleExtraButtonClick(props, state, callback, true);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: { 'a': ['You did not see it coming, did you?'] },
      });
    });

    it('should return a state that contains the values and the errors that the callback returns', () => {

      const callback = jest.fn((context: FormContext, values: { [key: string]: any }, errors: { [key: string]: string[] }): SubmitCallbackResponse => {
        return {
          errors: { 'a': ['You did not see it coming, did you?'] },
          values: { a: 20, b: 'b', c: false },
        };
      });

      const response = handleExtraButtonClick(props, state, callback, true);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: { 'a': ['You did not see it coming, did you?'] },
        values: { a: 20, b: 'b', c: false },
      });
    });

    it('should not call the callback if there are errors', () => {

      const state: IState = {
        context,
        errors: { 'a': ['The error that the form passes.'] },
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      };

      const callback = jest.fn(() => {
      });

      handleExtraButtonClick(props, state, callback, false);

      const callbackCalls = callback.mock.calls;
      expect(callbackCalls.length).toBe(0);
    });

    it('should return the exact same value and errors in the state', () => {

      const state: IState = {
        context,
        errors: { 'a': ['The error that the form passes.'] },
        interceptors: {},
        values: { a: 1, b: 'b', c: false },
      };

      const response = handleExtraButtonClick(props, state, () => {
      }, false);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: { 'a': ['The error that the form passes.'] },
        values: { a: 1, b: 'b', c: false },
      });
    });

    it('should return combined errors along with the one in the state', () => {

      const state: IState = {
        context,
        errors: { 'a': ['The error that the form passes.'] },
        interceptors: {
          'a': {
            onBlur: [],
            onChange: [],
            onSubmit: [new ValidatorNotEmptyHandler()],
          }
        },
        values: { a: 0, b: 'b', c: false },
      };

      const response = handleExtraButtonClick(props, state, () => {
      }, false);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: { 'a': ['The error that the form passes.', 'A cannot be empty.'] },
        values: { a: 0, b: 'b', c: false },
      });
    });
  });
});
