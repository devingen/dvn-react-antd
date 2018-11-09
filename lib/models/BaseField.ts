import { FieldTypes } from './FieldTypes';
import { InterceptorConfig } from '../interceptors';

export class BaseField {
  // Identifier of the form item. When the form submitted, the values are
  // saved by the form item id. Must not change because the values are bound to them.
  public id: string;
  
  // Type of the component.
  public type: FieldTypes;
  
  // The question text. Must be present.
  public title: string;
  
  // Additional descriptive information shown below the title.
  public description?: string;
  
  // Forces user to fill the field.
  public required?: boolean;
  
  // Initial value of the field.
  public value?: any;
  
  // Interceptors that are triggered on value change.
  public onChange?: InterceptorConfig[];
  
  // Interceptors that are triggered on input blur.
  public onBlur?: InterceptorConfig[];
  
  // Interceptors that are triggered on form submit.
  public onSubmit?: InterceptorConfig[];
  
  // Renders the custom component. Overrides the 'type'.
  public render?: (
    field: BaseField, value: any, errors: any[], disabled: boolean,
    onFieldChange: (field: BaseField, value: any) => void,
    onFieldBlur: (field: BaseField) => void,
  ) => any;
}

