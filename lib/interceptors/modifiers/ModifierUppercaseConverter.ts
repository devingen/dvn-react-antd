import { FormContext } from '../../form/FormContext';
import { HandlerResponse, InterceptorHandler } from '../index';

export class ModifierUppercaseConverter extends InterceptorHandler {
  
  public static id: string = 'modifierUppercaseConverter';
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (typeof value === 'string' || value instanceof String) {
      return { value: value.toUpperCase() };
    }
    return { value };
  }
}
