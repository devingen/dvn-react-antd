import { Values } from '../form/Form';
import { FormContext } from '../form/FormContext';
import { BaseField } from './BaseField';
import { InterceptorHandler } from './InterceptorHandler';
import { InterceptorHandlerResponse } from './InterceptorHandlerResponse';

export abstract class VisibilityHandler extends InterceptorHandler {

  public abstract shouldShow(context: FormContext, values: Values, field: BaseField, value: any): boolean

  public run(context: FormContext, values: Values, field: BaseField, value: any, boundField?: BaseField): InterceptorHandlerResponse {
    return { value: values[boundField!.id], visible: this.shouldShow(context, values, field, value) };
  }
}
