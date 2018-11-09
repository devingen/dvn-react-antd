import { FormContext } from '../../form/FormContext';
import { HandlerResponse, InterceptorHandler } from '../index';

export class ModifierLowercaseConverter extends InterceptorHandler {
  
  public static id: string = 'modifierLowercaseConverter';
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (typeof value === 'string' || value instanceof String) {
      return { value: value.toLowerCase() };
    }
    return { value };
  }
}