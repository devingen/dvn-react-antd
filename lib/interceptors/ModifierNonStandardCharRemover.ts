import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ModifierNonStandardCharRemover extends InterceptorConfig {

  public static id: string = 'modifierNonStandardCharRemover';

  public id: string = 'modifierNonStandardCharRemover';

}

export class ModifierNonStandardCharRemoverHandler extends InterceptorHandler {

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {
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

registerInterceptor(ModifierNonStandardCharRemover.id, (config: InterceptorConfig) => new ModifierNonStandardCharRemoverHandler());
