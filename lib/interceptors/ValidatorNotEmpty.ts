import { FormContext } from '../form/FormContext';
import { BaseField } from "../models/BaseField";
import { InterceptorConfig } from "../models/InterceptorConfig";
import { InterceptorHandler } from "../models/InterceptorHandler";
import { InterceptorHandlerResponse } from "../models/InterceptorHandlerResponse";
import { registerInterceptor } from "./InterceptorGenerator";

export class ValidatorNotEmpty extends InterceptorConfig {

  public static id: string = 'validatorNotEmpty';

  public id: string = 'validatorNotEmpty';

}

export class ValidatorNotEmptyHandler extends InterceptorHandler {

  public run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse {

    if (!value || value === '' || value === 0 || (Array.isArray(value) && value.length === 0)) {
      let error = `${field.title} cannot be empty.`;
      if (context!.language === 'tr') {
        error = `${field.title} boş olamaz.`
      }

      return {
        error,
        value,
      };
    }
    return { value };
  }
}

registerInterceptor(ValidatorNotEmpty.id, (config: InterceptorConfig) => new ValidatorNotEmptyHandler());
