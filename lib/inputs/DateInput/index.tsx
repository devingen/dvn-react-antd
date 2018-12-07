import * as React from 'react';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import { InputDate } from './InputDate';

export class DateInput extends BaseField {

  public static type = 'date';

  public type = 'date';

  public dateFormat: string = 'YYYY-MM-DD';

  public timeFormat: string = 'HH:mm:ss';

  public inputType: 'date' | 'time' | 'dateTime' = 'date';

  public placeholder?: string;

  public timePlaceholder?: string;

  // Renders only the value, not the input field.
  public preview?: boolean;

  public render = render;

  constructor(id: string, title: string, placeholder?: string, description?: string) {
    super();
    this.id = id;
    this.title = title;
    this.placeholder = placeholder;
    this.description = description;
  }

  public setDateFormat(format: string): DateInput {
    this.dateFormat = format;
    return this;
  }

  public setInputType(inputType: 'date' | 'time' | 'dateTime'): DateInput {
    this.inputType = inputType;
    return this;
  }

  public setTimeFormat(format: string): DateInput {
    this.timeFormat = format;
    return this;
  }

  public setTimePlaceholder(placeholder: string): DateInput {
    this.timePlaceholder = placeholder;
    return this;
  }

  public showPreview(): DateInput {
    this.preview = true;
    return this;
  }
}

// component generator
export const render: InputGenerator = (
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
