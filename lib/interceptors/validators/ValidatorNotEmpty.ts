import { FormContext } from '../../form/FormContext';
import { HandlerResponse, InterceptorHandler } from '../index';

export class ValidatorNotEmpty extends InterceptorHandler {
  
  public static id: string = 'validatorNotEmpty';
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (!value || value === '' || value === 0) {
      let error = `${this.field.title} cannot be empty.`;
      if (context!.language === 'tr') {
        error = `${this.field.title} boş olamaz.`
      }
  
      return {
        error,
        value,
      };
    }
    return { value };
  }
}