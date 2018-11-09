import { FormContext } from '../../form/FormContext';
import { HandlerResponse, InterceptorHandler } from '../index';

const isValidEmail = (email: string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

export class ValidatorEmail extends InterceptorHandler {
  
  public static id: string = 'validatorEmail';
  
  public run(context: FormContext, value: any): HandlerResponse {
    if (!value) {
      // return no error if there is no value
      return { value };
    }
    
    if (!isValidEmail(value)) {
      let error = `${this.field.title} is not a valid email.`;
      if (context!.language === 'tr') {
        error = `${this.field.title} doğru bir e-posta değil.`
      }
      
      return {
        error,
        value,
      };
    }
    return { value };
  }
}