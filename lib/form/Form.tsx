import { Button } from 'antd';
import * as cn from 'classnames';
import * as React from 'react';
import { colors } from '../constants';
import { generateInput } from '../inputs/InputGenerator';
import { executeInterceptors, generateInterceptor } from "../interceptors/InterceptorGenerator";
import { BaseField } from "../models/BaseField";
import { InterceptorConfig } from "../models/InterceptorConfig";
import { InterceptorHandler } from "../models/InterceptorHandler";

import './Form.css';
import { FormContext } from './FormContext';

export class FormData {

  public constructor(public fields: BaseField[], public showFieldOrder?: boolean, public version?: number) {
    if (!version) {
      this.version = 0.1;
    }
  }
}

export type SubmitCallbackResponse = { values?: { [key: string]: any }, errors?: { [key: string]: string[] } }

export type SubmitCallback = (values: { [key: string]: any }, errors: { [key: string]: string[] }, context: FormContext) => SubmitCallbackResponse | void

export class ButtonProps {
  public label: string;
  public loading: boolean;
  public type?: 'primary' | 'danger';
  public onClick: SubmitCallback;
}

export interface IProps {
  extraButtons?: ButtonProps[]
  formData: FormData
  language?: 'en' | 'tr'
  layout?: 'horizontal' | 'vertical' | 'compact'
  loading: boolean
  onSubmit: SubmitCallback
  passErrorsToSubmit?: boolean
  submitButtonLabel: string
}

type StateError = { [key: string]: string[] }
type StateInterceptors = { [key: string]: InterceptorBundle }
type StateValues = { [key: string]: any }

export interface IState {

  context: FormContext

  // Errors of the fields.
  errors: StateError

  // Interceptors of the fields.
  interceptors: StateInterceptors

  // Values of the fields.
  values: StateValues
}

export class InterceptorBundle {
  public onBlur: InterceptorHandler[];
  public onChange: InterceptorHandler[];
  public onSubmit: InterceptorHandler[];
}

export class Form extends React.Component<IProps, IState> {

  public static defaultProps: Partial<IProps> = {
    extraButtons: [],
    layout: 'vertical',
  };

  public constructor(props: IProps) {
    super(props);

    this.state = generateState(props);
  }

  public render() {
    const { formData, layout, loading, submitButtonLabel, extraButtons } = this.props;
    const { fields } = formData;
    const { errors, values } = this.state;

    // retrieve the first error and show at the bottom
    const error = getFirstError(errors);

    // order is used to show the field order numbers if props.showFieldOrder is true
    let order = 0;

    return (
      <form className={cn({
        'dvn-form': true,
        [layout as string]: true,
      })} onSubmit={(e: any) => this.onFormSubmit(e)}>
        {fields.map(field => {

          const input = generateInput(field, values[field.id], errors[field.id], loading, this.onFieldChange, this.onFieldBlur);
          if (field.title && field.title !== '') {
            order += 1;
          }

          return (
            <div
              id={field.id}
              key={field.id}
              className={cn({
                'dvn-form-field': true,
                'dvn-row': layout === 'horizontal',
                required: field.required,
              })}>
              <div className={cn({
                'dvn-col-sm-6': layout === 'horizontal',
                'dvn-empty-label': !field.title,
                'dvn-form-label': true,
              })}>
                <label htmlFor={field.id}>
                  <b>
                    {formData.showFieldOrder && `${order}. `}
                    {field.title}
                  </b>

                  {(layout === 'vertical' && field.description && field.description !== '') &&
                  <div className="description">
                    {field.description}
                  </div>
                  }
                </label>
              </div>

              <div className={cn({
                'dvn-col-sm-18': layout === 'horizontal',
                'dvn-input-container': true,
              })}>

                {(layout === 'horizontal' && field.description && field.description !== '') &&
                <div className="dvn-form-label-right">
                  {field.description}
                </div>
                }

                {input}
              </div>
            </div>
          );
        })}

        <div className="dvn-form-footer">
          {error && <span style={{ color: colors.error, marginRight: '1rem' }}>{error}</span>}

          {extraButtons!.map(button =>
            <Button
              key={button.label}
              type={button.type}
              loading={button.loading}
              onClick={() => this.onExtraButtonClick(button.onClick)}
              style={{ marginRight: '1rem' }}
            >
              {button.label}
            </Button>,
          )}

          {submitButtonLabel &&
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {submitButtonLabel}
          </Button>
          }
        </div>
      </form>
    );
  }

  private onExtraButtonClick(callback: SubmitCallback) {

    const state = handleExtraButtonClick(this.props, this.state, callback, true);

    if (state) {
      this.setState(state);
    }
  }

  private onFieldBlur = (field: BaseField) => {
    this.setState(generateStateOnFieldBlur(this.state, field));
  };

  private onFieldChange = (field: BaseField, value: any) => {
    this.setState(generateStateOnFieldChange(this.state, field, value));
  };

  private onFormSubmit(e: any) {
    e.preventDefault();

    const state = handleExtraButtonClick(this.props, this.state, this.props.onSubmit, !!this.props.passErrorsToSubmit);

    if (state) {
      this.setState(state);
    }
  };
}

/**
 * Executes the extra button callback and returns a new state with the values returned from the callback.
 * Returns nothing if the callback returns nothing.
 * @param props
 * @param state
 * @param callback
 * @param passErrorsToCallback is used to call callback even though there are errors.
 */
export function handleExtraButtonClick(props: IProps, state: IState, callback: SubmitCallback, passErrorsToCallback: boolean): IState | undefined {

  const { formData } = props;
  const { context, errors, interceptors, values } = state;
  const { fields } = formData;

  // retrieve errors that the interceptors return on submit
  const onSubmitErrors = executeOnSubmitInterceptors(context, fields, interceptors, values);

  if (!passErrorsToCallback && getFirstError(mergeErrors(errors, onSubmitErrors))) {
    // skip the rest if the errors should not be passed to the callback
    return { ...state, errors: mergeErrors(errors, onSubmitErrors), values };
  }

  const response = callback(values, mergeErrors(errors, onSubmitErrors), context);

  if (!response || (!response.errors && !response.values)) {
    return { ...state, errors: mergeErrors(errors, onSubmitErrors), values };
  }

  const newState: IState = { ...state };
  if (response && response.errors) {
    newState.errors = response.errors;
  }
  if (response && response.values) {
    newState.values = response.values;
  }
  return newState;
}

/**
 * Generates the initial state from the props.
 * @param props
 */
function generateState(props: IProps): IState {

  const values: Map<string, any> = new Map<string, any>();
  const interceptors = {};

  for (const field of props.formData.fields) {
    values.set(field.id, field.value);

    const hasValidatorNotEmpty = (field.interceptors
      && field.interceptors.onSubmit
      && !!field.interceptors.onSubmit.find(i => i.id === 'validatorNotEmpty'));

    const getInterceptors = (interceptors: any, type: string) => interceptors ? (interceptors[type] || []) : [];

    if (field.required && !hasValidatorNotEmpty) {
      // add validatorNotEmpty if the field is required and validatorNotEmpty is not in onSubmit interceptors
      field.interceptors = {
        ...(field.interceptors || {}),
        onSubmit: [{ id: 'validatorNotEmpty' }, ...getInterceptors(field.interceptors, 'onSubmit')]
      }
    }

    interceptors[field.id] = {
      onBlur: getInterceptors(field.interceptors, 'onBlur').map((conf: InterceptorConfig) => generateInterceptor(conf)),
      onChange: getInterceptors(field.interceptors, 'onChange').map((conf: InterceptorConfig) => generateInterceptor(conf)),
      onSubmit: getInterceptors(field.interceptors, 'onSubmit').map((conf: InterceptorConfig) => generateInterceptor(conf)),
    };
  }

  return {
    context: generateContext(props.language),
    errors: {},
    interceptors,
    values,
  };
}

/**
 * Generates a new state when the field loses the focus.
 *
 * @param state is the current state.
 * @param field that loses the focus.
 */
export function generateStateOnFieldBlur(state: IState, field: BaseField): IState {

  const { context, errors, interceptors, values } = state;

  // get the existing error of the field
  const fieldErrors = [...(errors[field.id] || [])];

  // get the value from the state
  const value = values[field.id];

  // execute the interceptors, they may modify the given value
  const result = executeInterceptors(context, field, value, interceptors[field.id], 'onBlur');

  const newErrorState = { ...errors };
  if (result.error) {
    newErrorState[field.id] = [...fieldErrors, result.error];
  }

  return {
    ...state,
    errors: newErrorState,
    values: { ...values, [field.id]: result.value },
  };
}

/**
 * Generates a new state when the value of a field changes.
 *
 * @param state is the current state.
 * @param field that whose value is changed.
 * @param value is the new value of the given field.
 */
export function generateStateOnFieldChange(state: IState, field: BaseField, value: any): IState {

  const { context, errors, interceptors, values } = state;

  // execute the interceptors, they may modify the given value
  const result = executeInterceptors(context, field, value, interceptors[field.id], 'onChange');

  // override the previous errors of this field. the user should not see the old
  // errors before modification because modification may invalidate the existing errors
  return {
    ...state,
    errors: { ...errors, [field.id]: result.error ? [result.error] : [] },
    values: { ...values, [field.id]: result.value },
  };
}

/**
 * Checks whether the errors map has any error and returns the first (field order) found error.
 * @param errors to check.
 * @return the error if exists, nothing otherwise.
 */
export function getFirstError(errors: { [key: string]: string[] }): string | undefined {

  let error;
  for (const fieldId of Object.keys(errors)) {
    if (errors[fieldId]) {
      error = errors[fieldId].find((e: any) => !!e);
      if (error) {
        return error;
      }
    }
  }

  return undefined;
}

/**
 * Executes the onSubmit interceptors on all fields and returns the field -> error map.
 * @param context
 * @param fields
 * @param interceptors
 * @param values
 */
export function executeOnSubmitInterceptors(context: FormContext, fields: BaseField[], interceptors: StateInterceptors, values: StateValues): StateError {

  const errors = {};

  // execute onSubmit interceptors on every field
  for (const field of fields) {
    const value = values[field.id];

    // execute the interceptors, they may modify the given value
    const result = executeInterceptors(context, field, value, interceptors[field.id], 'onSubmit');

    if (result.error) {
      // return the first error
      errors[field.id] = [result.error];
    }
  }

  return errors;
}

/**
 * Generates a context, default language is 'en'.
 * TODO the language and dictionary structure should be changed to something that makes more sense
 * @param language
 */
export function generateContext(language: string = 'en') {
  if (language !== 'en' && language !== 'tr') {
    return new FormContext('en');
  }
  return new FormContext(language);
}

/**
 * Merges the given id -> error maps into one map.
 * @param errors1
 * @param errors2
 */
export function mergeErrors(errors1: StateError, errors2: StateError): StateError {
  if (!errors1) {
    return errors2;
  } else if (!errors2) {
    return errors1;
  }

  const errors = {};

  const uniqueIds = Array.from(new Set([...Object.keys(errors1), ...Object.keys(errors2)]));

  for (const id of uniqueIds) {
    if (!errors1[id]) {
      errors[id] = errors2[id];
    } else if (!errors2[id]) {
      errors[id] = errors1[id];
    } else {
      errors[id] = [...errors1[id], ...errors2[id]];
    }
  }

  return errors;
}

export default Form;
