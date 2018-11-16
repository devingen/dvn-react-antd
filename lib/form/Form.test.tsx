import { TextInput } from "../inputs/TextInput";
import { ValidatorEmail, ValidatorLength } from "../interceptors";
import { ValidatorNotEmptyHandler } from "../interceptors/ValidatorNotEmpty";
import { BaseField } from "../models/BaseField";
import { generateStateOnFieldBlur, handleExtraButtonClick, InterceptorBundle, IProps, IState } from "./Form";
import { FormContext } from "./FormContext";

const context = new FormContext('en');

describe('ValidatorURL', () => {

  describe('generateStateOnFieldBlur()', () => {

    it('should return no error if there is no existing error and the onBlur interceptors return no error', () => {
      const state: IState = {
        context,
        errors: new Map<string, string[]>(),
        interceptors: new Map<string, InterceptorBundle>(),
        values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: new Map<string, string[]>(),
        interceptors: new Map<string, InterceptorBundle>(),
        values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
      });
    })

    it('should return previous errors if there are existing errors and the onBlur interceptors return no error', () => {
      const state: IState = {
        context,
        errors: new Map<string, string[]>().set('a', ['Fix this!']),
        interceptors: new Map<string, InterceptorBundle>(),
        values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: new Map<string, string[]>().set('a', ['Fix this!']),
        interceptors: new Map<string, InterceptorBundle>(),
        values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
      });
    })

    it('should return combined errors if there are existing errors and the onBlur interceptors return error too', () => {
      const state: IState = {
        context,
        errors: new Map<string, string[]>().set('a', ['Fix this!']),
        interceptors: new Map<string, InterceptorBundle>().set('a', {
          onBlur: [new ValidatorNotEmptyHandler()],
          onChange: [],
          onSubmit: [],
        }),
        values: new Map<string, any>().set('a', 0).set('b', 'b').set('c', false),
      };

      const field = {
        id: 'a',
        title: 'A',
        type: 'text',
      };

      expect(generateStateOnFieldBlur(state, field as BaseField)).toEqual({
        context,
        errors: new Map<string, string[]>().set('a', ['Fix this!', 'A cannot be empty.']),
        interceptors: new Map<string, InterceptorBundle>().set('a', {
          onBlur: [new ValidatorNotEmptyHandler()],
          onChange: [],
          onSubmit: [],
        }),
        values: new Map<string, any>().set('a', 0).set('b', 'b').set('c', false),
      });
    })

  });

  describe('handleExtraButtonClick()', () => {

    const fields = [
      new TextInput(
        'email',
        'Email',
        'Email',
        '',
        'email',
      ).addInterceptor('onSubmit', new ValidatorEmail())
        .require(),
      new TextInput(
        'password',
        'Password',
        'Password',
        '',
        'password',
      ).addInterceptor('onSubmit', new ValidatorLength(6, 10))
        .require(),
    ];

    const props: IProps = {
      formData: { fields },
      loading: false,
      onSubmit: (values: any) => {
      },
      submitButtonLabel: 'Hit me!',
    };

    const state: IState = {
      context,
      errors: new Map<string, string[]>(),
      interceptors: new Map<string, InterceptorBundle>(),
      values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
    };

    it('should pass existing values and errors to the button callback when the button is clicked', () => {

      const callback = jest.fn();
      const callbackCalls = callback.mock.calls;

      handleExtraButtonClick(props, state, callback);

      expect(callbackCalls.length).toBe(1);
      expect(callbackCalls[0].length).toBe(3);
      expect(callbackCalls[0][0]).toEqual(new FormContext());
      expect(callbackCalls[0][1]).toEqual(new Map<string, any>().set('a', 1).set('b', 'b').set('c', false));
      expect(callbackCalls[0][2]).toEqual(new Map<string, string[]>());
    });

    it('should return an undefined state if the callback return nothing', () => {

      const callback = jest.fn();
      const response = handleExtraButtonClick(props, state, callback);
      expect(response).toBeUndefined();
    });

    it('should return a state that contains the values that the callback returns', () => {

      const callback = jest.fn((context: FormContext, values: Map<string, any>, errors: Map<string, any>) => {
        return {
          values: new Map<string, any>().set('a', 20).set('b', 'b').set('c', false)
        }
      });

      const response = handleExtraButtonClick(props, state, callback);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        values: new Map<string, any>().set('a', 20).set('b', 'b').set('c', false),
      });
    });

    it('should return a state that contains the errors that the callback returns', () => {

      const state: IState = {
        context,
        errors: new Map<string, string[]>().set('a', ['The error that the form passes.']),
        interceptors: new Map<string, InterceptorBundle>(),
        values: new Map<string, any>().set('a', 1).set('b', 'b').set('c', false),
      };

      const callback = jest.fn((context: FormContext, values: Map<string, any>, errors: Map<string, any>) => {
        return {
          errors: new Map<string, string[]>().set('a', ['You did not see it coming, did you?']),
        }
      });

      const response = handleExtraButtonClick(props, state, callback);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: new Map<string, string[]>().set('a', ['You did not see it coming, did you?']),
      });
    });

    it('should return a state that contains the values and the errors that the callback returns', () => {

      const callback = jest.fn((context: FormContext, values: Map<string, any>, errors: Map<string, any>) => {
        return {
          errors: new Map<string, string[]>().set('a', ['You did not see it coming, did you?']),
          values: new Map<string, any>().set('a', 20).set('b', 'b').set('c', false),
        }
      });

      const response = handleExtraButtonClick(props, state, callback);

      expect(response).toBeDefined();
      expect(response).toEqual({
        ...state,
        errors: new Map<string, string[]>().set('a', ['You did not see it coming, did you?']),
        values: new Map<string, any>().set('a', 20).set('b', 'b').set('c', false),
      });
    });
  });
});
