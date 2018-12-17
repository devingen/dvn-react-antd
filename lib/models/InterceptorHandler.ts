import { Values } from '../form/Form';
import { FormContext } from '../form/FormContext';
import { BaseField } from './BaseField';
import { InterceptorHandlerResponse } from './InterceptorHandlerResponse';

export abstract class InterceptorHandler {

  /**
   * Called by the Form.
   *
   * @param context of the form.
   * @param values of the form fields at the moment.
   * @param field whose value is changed.
   * @param value
   * @param boundField
   */
  public abstract run(context: FormContext, values: Values, field: BaseField, value: any, boundField?: BaseField): InterceptorHandlerResponse
}


