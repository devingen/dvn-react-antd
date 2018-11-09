import { FormContext } from '../../form/FormContext';
import { HandlerResponse, InterceptorHandler } from '../index';

export class ModifierNonStandardCharRemover extends InterceptorHandler {
  
  public static id: string = 'modifierNonStandardCharRemover';
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (typeof value === 'string' || value instanceof String) {
      return {
        value: value.replace(
          /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '',
        ),
      };
    }
    return { value };
  }
}
