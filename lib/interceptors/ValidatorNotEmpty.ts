import { Values } from '../form/Form';
import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ValidatorNotEmpty extends InterceptorConfig {

  public static id: string = 'validatorNotEmpty';

  public id: string = 'validatorNotEmpty';

}

export class ValidatorNotEmptyHandler extends InterceptorHandler {

  public run(context: FormContext, values: Values, field: BaseField, value: any): InterceptorHandlerResponse {

    if (!value || value === '' || value === 0 || (Array.isArray(value) && value.length === 0)) {

      return {
        error: context.strings.interceptors.validatorNotEmpty.message.replace('{title}', field.title),
        value,
      };
    }
    return { value };
  }
}

registerInterceptor(ValidatorNotEmpty.id, (config: InterceptorConfig) => new ValidatorNotEmptyHandler());
