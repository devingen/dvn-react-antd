import { FormContext } from '../form/FormContext';
import { BaseField } from "../models/BaseField";
import { HandlerResponse, InterceptorConfig, InterceptorHandler } from './index';
import { ModifierLowercaseConverter } from './modifiers/ModifierLowercaseConverter';
import { ModifierNonStandardCharRemover } from './modifiers/ModifierNonStandardCharRemover';
import { ModifierUppercaseConverter } from './modifiers/ModifierUppercaseConverter';
import { ValidatorEmail } from './validators/ValidatorEmail';
import { ValidatorLength } from './validators/ValidatorLength';
import { ValidatorNotEmpty } from './validators/ValidatorNotEmpty';
import { ValidatorURL } from './validators/ValidatorURL';

export function generateInterceptor(field: BaseField, interceptorConfig: InterceptorConfig): InterceptorHandler | undefined {
  switch (interceptorConfig.id) {
    case ValidatorNotEmpty.id:
      return new ValidatorNotEmpty(field, interceptorConfig);
    case ValidatorLength.id:
      return new ValidatorLength(field, interceptorConfig);
    case ValidatorURL.id:
      return new ValidatorURL(field, interceptorConfig);
    case ValidatorEmail.id:
      return new ValidatorEmail(field, interceptorConfig);
    
    case ModifierLowercaseConverter.id:
      return new ModifierLowercaseConverter(field, interceptorConfig);
    case ModifierUppercaseConverter.id:
      return new ModifierUppercaseConverter(field, interceptorConfig);
    case ModifierNonStandardCharRemover.id:
      return new ModifierNonStandardCharRemover(field, interceptorConfig);
  }
  return undefined;
}

export function executeInterceptors(context: FormContext, field: BaseField, value: any, interceptors: InterceptorHandler[]): HandlerResponse {
  
  let v = value;
  for (const interceptor of interceptors) {
    if (!interceptor) {
      continue;
    }
    const response = interceptor.run(context, v);
    if (response.error) {
      // don't proceed to other interceptor if an error returned
      return response;
    }
    v = response.value;
  }
  return new HandlerResponse(v);
}
