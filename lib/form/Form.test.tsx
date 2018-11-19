import { TextInput } from "../inputs/TextInput";
import { ValidatorEmail, ValidatorLength } from "../interceptors";
import { ValidatorNotEmptyHandler } from "../interceptors/ValidatorNotEmpty";
import { BaseField } from "../models/BaseField";
import {
  SubmitCallbackResponse,
  generateStateOnFieldBlur,
  handleExtraButtonClick,
  IProps,
  IState
} from "./Form";
import { FormContext } from "./FormContext";

const context = new FormContext('en');

describe('ValidatorURL', () => {

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
    })

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
    })

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
    })

  });

  describe('handleExtraButtonClick()', () => {

    const fields = [
      new TextInput('a', 'A', 'Aaa').addInterceptor('onSubmit', new ValidatorEmail()).require(),
      new TextInput('b', 'B', 'Bbb').addInterceptor('onSubmit', new ValidatorLength(6, 10)).require(),
    ];

    const props: IProps = {
      formData: { fields },
      loading: false,
      onSubmit: (values: { [key: string]: any }, errors: { [key: string]: string[] }, context: FormContext) => {
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
        "context": { "language": "en" },
        "errors": {},
        "interceptors": {},
        "values": { "a": 1, "b": "b", "c": false }
      });
    });

    it('should return a state that contains the values that the callback returns', () => {

      const callback = jest.fn((context: FormContext, values: { [key: string]: any }, errors: { [key: string]: string[] }): SubmitCallbackResponse => {
        return {
          values: { a: 20, b: 'b', c: false }
        }
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
        }
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
        }
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
