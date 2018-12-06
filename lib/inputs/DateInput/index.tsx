import * as React from 'react';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import { InputDate } from './InputDate';

export class DateInput extends BaseField {

  public static type = 'date';

  public type = 'date';

  public dateFormat: string = 'YYYY-MM-DD';

  public placeholder?: string;

  // Renders only the value, not the input field.
  public preview?: boolean;

  public render = render;

  constructor(id: string, title: string, placeholder?: string, description?: string, dateFormat?: string) {
    super();
    this.id = id;
    this.title = title;
    this.placeholder = placeholder;
    this.description = description;

    if (dateFormat) {
      this.dateFormat = dateFormat;
    }
  }

  public showPreview(): BaseField {
    this.preview = true;
    return this;
  }
}

// component generator
const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputDate
  disabled={disabled}
  field={field as DateInput}
  errors={errors}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'number' field for json form generations
registerField('date', render);
