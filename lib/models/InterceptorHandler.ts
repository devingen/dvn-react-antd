import { FormContext } from '../form/FormContext';
import { BaseField } from './BaseField';
import { InterceptorHandlerResponse } from './InterceptorHandlerResponse';

export abstract class InterceptorHandler {

  public abstract run(context: FormContext, field: BaseField, value: any): InterceptorHandlerResponse
}


