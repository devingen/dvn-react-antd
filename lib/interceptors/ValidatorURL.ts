import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';
import { registerInterceptor } from './InterceptorGenerator';

export class ValidatorURL extends InterceptorConfig {

  public static id: string = 'validatorUrl';

  public id: string = 'validatorUrl';

}

const isValidURL = (value: any) => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);

export class ValidatorURLHandler extends InterceptorHandler {

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {
    if (!value) {
      // return no error if there is no value
      return { value };
    }

    if (!isValidURL(value)) {
      let error = `${field.title} is not a valid URL. Be sure it starts with HTTP or HTTPS.`;
      if (context!.language === 'tr') {
        error = `${field.title} doğru bir URL değil. Başında HTTP veya HTTPS olduğuna emin olun.`;
      }

      return {
        error,
        value,
      };
    }
    return { value };
  }
}

registerInterceptor(ValidatorURL.id, (config: InterceptorConfig) => new ValidatorURLHandler());
