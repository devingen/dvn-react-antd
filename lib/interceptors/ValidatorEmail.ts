import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ValidatorEmail extends InterceptorConfig {

  public static id: string = 'validatorEmail';

  public id: string = 'validatorEmail';

}

const isValidEmail = (email: string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

export class ValidatorEmailHandler extends InterceptorHandler {

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {
    if (!value) {
      // return no error if there is no value
      return { value };
    }

    if (!isValidEmail(value)) {

      return {
        error: context.strings.interceptors.validatorEmail.message.replace('{title}', field.title),
        value,
      };
    }
    return { value };
  }
}

registerInterceptor(ValidatorEmail.id, (config: InterceptorConfig) => new ValidatorEmailHandler());
