import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ModifierUppercaseConverter extends InterceptorConfig {

  public static id: string = 'modifierUppercaseConverter';

  public id: string = 'modifierUppercaseConverter';

}

export class ModifierUppercaseConverterHandler extends InterceptorHandler {

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {
    if (typeof value === 'string' || value instanceof String) {
      return { value: value.toUpperCase() };
    }
    return { value };
  }
}

registerInterceptor(ModifierUppercaseConverter.id, (config: InterceptorConfig) => new ModifierUppercaseConverterHandler());
