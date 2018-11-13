import { FormContext } from '../form/FormContext';
import { BaseField } from "../models/BaseField";

export class InterceptorConfig {
  public id: string;
  public params?: any;
}

export abstract class InterceptorHandler {
  
  public constructor(public field: BaseField, public config: InterceptorConfig) {
  }
  
  public abstract run(context: FormContext, value: any): HandlerResponse
}

export class HandlerResponse {
  constructor(public value: any, public error?: string) {
  
  }
}
