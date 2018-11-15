import { FormContext } from '../form/FormContext';
import { BaseField } from "../models/BaseField";
import { InterceptorConfig } from "../models/InterceptorConfig";
import { InterceptorHandler } from "../models/InterceptorHandler";
import { InterceptorHandlerResponse } from "../models/InterceptorHandlerResponse";
import { registerInterceptor } from "./InterceptorGenerator";

export class ValidatorLength extends InterceptorConfig {

  public static id: string = 'validatorLength';

  public id: string = 'validatorLength';

  public min?: number;

  public max?: number;

  constructor(min: number, max?: number) {
    super();
    this.min = min;
    this.max = max;
  }
}

export class ValidatorLengthHandler extends InterceptorHandler {

  private config: ValidatorLength;

  constructor(config: ValidatorLength) {
    super();
    this.config = config;
  }

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {

    const { max, min } = this.config;

    if (!min && !max) {
      return { value };
    }

    if (typeof value === 'string' || value instanceof String) {
      return validateString(context, field, value, min, max);
    } else if (value instanceof Array) {
      return validateArray(context, field, value, min, max);
    }

    return { value };
  }
}

export function validateArray(context: FormContext, field: BaseField, value: any, min?: number, max?: number): InterceptorHandlerResponse {

  if (min && (!value || value.length < min)) {
    let error = `${field.title} must be min ${min} items long.`;
    if (context!.language === 'tr') {
      error = `${field.title} en az ${min} tane olmalıdır.`;
    }

    return {
      error,
      value,
    };
  }

  if (max && (value && value.length > max)) {
    let error = `${field.title} must be max ${max} items long.`;
    if (context!.language === 'tr') {
      error = `${field.title} en fazla ${max} tane olmalıdır.`;
    }

    return {
      error,
      value,
    };
  }

  return { value };
}

export function validateString(context: FormContext, field: BaseField, value: any, min?: number, max?: number): InterceptorHandlerResponse {

  if (min && (!value || value.length < min)) {
    let error = `${field.title} must be min ${min} characters long.`;
    if (context!.language === 'tr') {
      error = `${field.title} en az ${min} harf içermelidir.`;
    }

    return {
      error,
      value,
    };
  }

  if (max && (value && value.length > max)) {
    let error = `${field.title} must be max ${max} characters long.`;
    if (context!.language === 'tr') {
      error = `${field.title} en fazla ${max} harf içermelidir.`;
    }

    return {
      error,
      value,
    };
  }

  return { value };
}

registerInterceptor(ValidatorLength.id, (config: ValidatorLength) => new ValidatorLengthHandler(config));
