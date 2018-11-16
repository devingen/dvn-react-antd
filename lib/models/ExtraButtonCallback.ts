import { FormContext } from '../form/FormContext';
import { InterceptorHandlerResponse } from "./InterceptorHandlerResponse";

export abstract class ExtraButtonCallback {

  public constructor() {
  }

  public abstract run(context: FormContext, values: Map<string, any>, errors: Map<string, any>): InterceptorHandlerResponse
}


