import * as React from 'react';
import * as cn from 'classnames';
import { Button } from 'antd';

import './Form.css';
import { executeInterceptors, generateInterceptor } from '../interceptors/InterceptorGenerator';
import { colors } from '../constants';
import { BaseField } from "../models/BaseField";
import { generateInput } from './InputGenerator';
import { InterceptorHandler } from '../interceptors';
import { FormContext } from './FormContext';

export class FormData {

  public constructor(public fields: BaseField[], public showFieldOrder?: boolean, public version?: number) {
    if (!version) {
      this.version = 0.1;
    }
  }
}

export class ButtonProps {
  public label: string;
  public loading: boolean;
  public type?: 'primary' | 'danger';
  public onClick: () => void;
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
  
  // Errors of the fields.
  errors: Map<string, any>
  
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
    
    const values: Map<string, any> = new Map<string, any>();
    const interceptors: Map<string, InterceptorBundle> = new Map<string, InterceptorBundle>();
    for (const field of props.formData.fields) {
      values[field.id] = field.value;
      
      const hasValidatorNotEmpty = (field.onSubmit && !!field.onSubmit.find(i => i.id === 'validatorNotEmpty'));
      
      if (field.required && !hasValidatorNotEmpty) {
        // add validatorNotEmpty if the field is required and validatorNotEmpty is not in onSubmit interceptors
        field.onSubmit = [{ id: 'validatorNotEmpty' }, ...(field.onSubmit || [])];
      }
      
      interceptors[field.id] = {
        onBlur: (field.onBlur || []).map(interceptorConfig => generateInterceptor(field, interceptorConfig)),
        onChange: (field.onChange || []).map(interceptorConfig => generateInterceptor(field, interceptorConfig)),
        onSubmit: (field.onSubmit || []).map(interceptorConfig => generateInterceptor(field, interceptorConfig)),
      };
    }
    
    this.state = {
      errors: new Map<string, any>(),
      interceptors,
      values,
    };
  }
  
  public onSubmit(e: any) {
    e.preventDefault();
    
    const { formData } = this.props;
    const { fields } = formData;
    const { errors, interceptors, values } = this.state;
    
    // check existing errors
    // onChange and onBlur interceptors may have returned errors
    let hasError = false;
    for (const fieldId of Object.keys(errors)) {
      if (errors[fieldId] && errors[fieldId].find((error: any) => !!error)) {
        hasError = true;
        break;
      }
    }
    
    // don't proceed if there is an error
    if (hasError) {
      return;
    }
    
    // execute onSubmit interceptors on every field
    for (const field of fields) {
      const value = values[field.id];
      
      // execute the interceptors, they may modify the given value
      const result = executeInterceptors(
        generateContext(this.props.language),
        field,
        value,
        interceptors[field.id].onSubmit,
      );
      
      if (result.error) {
        hasError = true;
        this.setState({
          errors: { ...this.state.errors, [field.id]: [result.error] },
        });
        
        // don't proceed if there is an error
        return;
      }
    }
    
    // submit the form if none of the checks above returned
    this.props.onSubmit(values);
  };
  
  public onFieldChange = (field: BaseField, value: any) => {
    
    // execute the interceptors, they may modify the given value
    const result = executeInterceptors(
      generateContext(this.props.language),
      field,
      value,
      this.state.interceptors[field.id].onChange,
    );
    
    this.setState({
      errors: { ...this.state.errors, [field.id]: result.error ? [result.error] : [] },
      values: { ...this.state.values, [field.id]: result.value },
    });
  };
  
  public onFieldBlur = (field: BaseField) => {
    
    // get the value from the state
    const value = this.state.values[field.id];
    
    // execute the interceptors, they may modify the given value
    const result = executeInterceptors(
      generateContext(this.props.language),
      field,
      value,
      this.state.interceptors[field.id].onBlur,
    );
    
    this.setState({
      errors: { ...this.state.errors, [field.id]: result.error ? [result.error] : [] },
      values: { ...this.state.values, [field.id]: result.value },
    });
  };
  
  public render() {
    const { formData, layout, loading, submitButtonLabel, extraButtons } = this.props;
    const { fields } = formData;
    const { errors, values } = this.state;
    let order = 0;
    
    let error;
    for (const fieldId of Object.keys(errors)) {
      if (errors[fieldId]) {
        error = errors[fieldId].find((e: any) => !!e);
        if (error) {
          break;
        }
      }
    }
    
    return (
      <form className={cn({
        'dvn-form': true,
        [layout as string]: true,
      })} onSubmit={(e: any) => this.onSubmit(e)}>
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
              onClick={() => button.onClick()}
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
}

function generateContext(language: string = 'en') {
  if (language !== 'en' && language !== 'tr') {
    return new FormContext('en');
  }
  return new FormContext(language);
}

export default Form;
