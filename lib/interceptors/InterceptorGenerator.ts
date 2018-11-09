import { ValidatorNotEmpty } from './validators/ValidatorNotEmpty';
import { ValidatorLength } from './validators/ValidatorLength';
import { HandlerResponse, InterceptorConfig, InterceptorHandler } from './index';
import { ModifierNonStandardCharRemover } from './modifiers/ModifierNonStandardCharRemover';
import { ModifierLowercaseConverter } from './modifiers/ModifierLowercaseConverter';
import { ModifierUppercaseConverter } from './modifiers/ModifierUppercaseConverter';
import { ValidatorURL } from './validators/ValidatorURL';
import { BaseField } from '..';
import { ValidatorEmail } from './validators/ValidatorEmail';
import { FormContext } from '../form/FormContext';

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
