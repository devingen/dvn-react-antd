import { Values } from '../form/Form';
import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ModifierLowercaseConverter extends InterceptorConfig {

  public static id: string = 'modifierLowercaseConverter';

  public id: string = 'modifierLowercaseConverter';

}

export class ModifierLowercaseConverterHandler extends InterceptorHandler {

  public run(context: FormContext, values: Values, field: BaseField, value: any): InterceptorHandlerResponse {
    if (typeof value === 'string' || value instanceof String) {
      return { value: value.toLowerCase() };
    }
    return { value };
  }
}

registerInterceptor(ModifierLowercaseConverter.id, (config: InterceptorConfig) => new ModifierLowercaseConverterHandler());
