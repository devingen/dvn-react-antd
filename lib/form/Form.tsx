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

export type ExtraButtonCallbackResponse = { values?: Map<string, any>, errors?: Map<string, any> } | undefined

export type ExtraButtonCallback = (context: FormContext, values: Map<string, any>, errors: Map<string, any>) => ExtraButtonCallbackResponse

export class ButtonProps {
  public label: string;
  public loading: boolean;
  public type?: 'primary' | 'danger';
  public onClick: ExtraButtonCallback;
}

export interface IProps {
  extraButtons?: ButtonProps[]
  formData: FormData
  language?: 'en' | 'tr'
  layout?: 'horizontal' | 'vertical' | 'compact'
  loading: boolean
  onSubmit: (values: any) => void
  submitButtonLabel: string
}

export interface IState {

  context: FormContext

  // Errors of the fields.
  errors: Map<string, string[]>

  // Interceptors of the fields.
  interceptors: Map<string, InterceptorBundle>

  // Values of the fields.
  values: Map<string, any>
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

  private onExtraButtonClick(callback: ExtraButtonCallback) {

    const state = handleExtraButtonClick(this.props, this.state, callback);

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

    const { formData } = this.props;
    const { fields } = formData;
    const { context, errors, interceptors, values } = this.state;

    // check existing errors. onChange and onBlur interceptors may have returned errors
    if (!!getFirstError(errors)) {
      // don't proceed if there is an error
      return;
    }

    // check if any onSubmit interceptors return an error
    const onSubmitErrors = executeOnSubmitInterceptors(context, fields, interceptors, values);

    if (onSubmitErrors.size > 0) {
      // set the errors and prevent the form submit
      this.setState({ errors: onSubmitErrors });
    } else {
      // submit the form
      this.props.onSubmit(values);
    }
  };
}

/**
 * Executes the extra button callback and returns a new state with the values returned from the callback.
 * Returns nothing if the callback returns nothing.
 * @param props
 * @param state
 * @param callback
 */
export function handleExtraButtonClick(props: IProps, state: IState, callback: ExtraButtonCallback): IState | undefined {

  const { formData } = props;
  const { context, errors, interceptors, values } = state;
  const { fields } = formData;

  // retrieve errors that the interceptors return on submit
  const onSubmitErrors = executeOnSubmitInterceptors(context, fields, interceptors, values);

  const response = callback(context, values, mergeErrors(errors, onSubmitErrors));

  if (!response || (!response.errors && !response.values)) {
    return undefined;
  }

  const newState: IState = { ...state };
  if (response && response.errors) {
    newState.errors = new Map<string, string[]>(response.errors);
  }
  if (response && response.values) {
    newState.values = new Map<string, any>(response.values);
  }
  return newState;
}

/**
 * Generates the initial state from the props.
 * @param props
 */
function generateState(props: IProps): IState {

  const values: Map<string, any> = new Map<string, any>();
  const interceptors: Map<string, InterceptorBundle> = new Map<string, InterceptorBundle>();
  for (const field of props.formData.fields) {
    values[field.id] = field.value;

    const hasValidatorNotEmpty = (field.interceptors
      && field.interceptors.onSubmit
      && !!field.interceptors.onSubmit.find(i => i.id === 'validatorNotEmpty'));

    const getInterceptors = (interceptors: any, type: string) => interceptors ? (interceptors[type] || []) : [];

    if (field.required && !hasValidatorNotEmpty) {
      // add validatorNotEmpty if the field is required and validatorNotEmpty is not in onSubmit interceptors
      field.interceptors = {
        ...(field.interceptors || {}),
        onSubmit: [
          { id: 'validatorNotEmpty' },
          ...getInterceptors(field.interceptors, 'onSubmit'),
        ]
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
    errors: new Map<string, any>(),
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
  const fieldErrors = [...(errors.get(field.id) || [])];

  // get the value from the state
  const value = values.get(field.id);

  // execute the interceptors, they may modify the given value
  const result = executeInterceptors(context, field, value, interceptors.get(field.id), 'onBlur');

  const newErrorState = new Map<string, string[]>(errors);
  if (result.error) {
    newErrorState.set(field.id, [...fieldErrors, result.error]);
  }

  return {
    ...state,
    errors: newErrorState,
    values: new Map<string, any>(values).set(field.id, result.value),
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
 * @return the error.
 */
export function getFirstError(errors: Map<string, any>): any {

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
export function executeOnSubmitInterceptors(context: FormContext, fields: BaseField[], interceptors: Map<string, InterceptorBundle>, values: Map<string, any>): Map<string, any> {

  const errors = new Map<string, string[]>();

  // execute onSubmit interceptors on every field
  for (const field of fields) {
    const value = values[field.id];

    // execute the interceptors, they may modify the given value
    const result = executeInterceptors(context, field, value, interceptors[field.id], 'onSubmit');

    if (result.error) {
      // return the first error
      return errors.set(field.id, [result.error]);
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
export function mergeErrors(errors1: Map<string, any>, errors2: Map<string, any>): Map<string, any> {
  if (!errors1) {
    return errors2;
  } else if (!errors2) {
    return errors1;
  }

  const errors = new Map<string, any>();

  const uniqueIds = Array.from(new Set([...Array.from(errors1.keys()), ...Array.from(errors2.keys())]))

  for (const id of uniqueIds) {
    if (!errors1.get(id)) {
      errors.set(id, errors2.get(id));
    } else if (!errors2.get(id)) {
      errors.set(id, errors1.get(id));
    } else {
      errors.set(id, [...errors1.get(id), ...errors2.get(id)]);
    }
  }

  return errors;
}

export default Form;
