import { InterceptorConfig } from "./InterceptorConfig";

export class BaseField {
  // Identifier of the form item. When the form submitted, the values are
  // saved by the form item id. Must not change because the values are bound to them.
  public id: string;

  // Type of the component.
  public type: string;

  // The question text. Must be present.
  public title: string;

  // Additional descriptive information shown below the title.
  public description?: string;

  // Forces user to fill the field.
  public required?: boolean;

  // Initial value of the field.
  public value?: any;

  public interceptors?: {

    // Interceptors that are triggered on value change.
    onChange?: InterceptorConfig[];

    // Interceptors that are triggered on input blur.
    onBlur?: InterceptorConfig[];

    // Interceptors that are triggered on form submit.
    onSubmit?: InterceptorConfig[];
  };

  // Renders the custom component. Overrides the 'type'.
  public render?: InputGenerator;

  /**
   * Appends new interceptor to the given interceptor type list.
   * @param type
   * @param interceptor
   */
  public addInterceptor(type: 'onChange' | 'onBlur' | 'onSubmit', interceptor: InterceptorConfig): BaseField {

    if (!this.interceptors) {
      this.interceptors = {}
    }

    this.interceptors = {
      ...this.interceptors,
      [type]: [...(this.interceptors[type] || []), interceptor]
    };

    return this;
  }

  public require(): BaseField {
    this.required = true;
    return this;
  }
}

export type InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => any
