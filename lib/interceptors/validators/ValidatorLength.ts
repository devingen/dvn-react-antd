import { FormContext } from '../../form/FormContext';
import { BaseField } from '../..';
import { HandlerResponse, InterceptorConfig, InterceptorHandler } from '../index';

export class ValidatorLength extends InterceptorHandler {
  
  public static id: string = 'validatorLength';
  
  private static validateString(value: any, field: BaseField, config: InterceptorConfig, context?: FormContext): HandlerResponse {
    
    if (config.params.min && (!value || value.length < config.params.min)) {
      let error = `${field.title} must be min ${config.params.min} characters long.`;
      if (context!.language === 'tr') {
        error = `${field.title} en az ${config.params.min} harf içermelidir.`;
      }
  
      return {
        error,
        value,
      };
    }
    
    if (config.params.max && (value && value.length > config.params.max)) {
      let error = `${field.title} must be max ${config.params.max} characters long.`;
      if (context!.language === 'tr') {
        error = `${field.title} en fazla ${config.params.max} harf içermelidir.`;
      }
  
      return {
        error,
        value,
      };
    }
    
    return { value };
  }
  
  private static validateArray(value: any, field: BaseField, config: InterceptorConfig, context?: FormContext): HandlerResponse {
    
    if (config.params.min && (!value || value.length < config.params.min)) {
      let error = `${field.title} must be min ${config.params.min} items long.`;
      if (context!.language === 'tr') {
        error = `${field.title} en az ${config.params.min} tane olmalıdır.`;
      }
  
      return {
        error,
        value,
      };
    }
    
    if (config.params.max && (value && value.length > config.params.max)) {
      let error = `${field.title} must be max ${config.params.max} items long.`;
      if (context!.language === 'tr') {
        error = `${field.title} en fazla ${config.params.max} tane olmalıdır.`;
      }
  
      return {
        error,
        value,
      };
    }
    
    return { value };
  }
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (!this.config.params) {
      return { value };
    }
    
    if (typeof value === 'string' || value instanceof String) {
      return ValidatorLength.validateString(value, this.field, this.config, context);
    } else if (value instanceof Array) {
      return ValidatorLength.validateArray(value, this.field, this.config, context);
    }
    
    return { value };
  }
}