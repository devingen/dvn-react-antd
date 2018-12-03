import * as React from 'react';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import { InputText } from './InputText';

type typeTnputType = 'email' | 'password' | 'tel' | 'text' | 'url';

export class TextInput extends BaseField {

  public static type = 'text';

  public type = 'text';

  public placeholder?: string;

  public inputType?: typeTnputType;

  // Default number of lines to occupy vertically.
  public lines: number;

  // Maximum number of lines to occupy vertically.
  public linesMax: number;

  // Renders only the value, not the input field.
  public preview?: boolean;

  public render = render;

  constructor(id: string, title: string, placeholder?: string, description?: string, inputType?: typeTnputType, lines: number = 1, linesMax: number = 1) {
    super();
    this.id = id;
    this.title = title;
    this.placeholder = placeholder;
    this.description = description;
    this.inputType = inputType;
    this.lines = lines;
    this.linesMax = linesMax;
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
) => <InputText
  disabled={disabled}
  field={field as TextInput}
  errors={errors}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'text' field for json form generations
registerField('text', render);
