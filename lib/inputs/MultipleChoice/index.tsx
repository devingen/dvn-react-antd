import * as React from 'react';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import InputMultipleChoice from './InputMultipleChoice';

export class MultipleChoice extends BaseField {

  public static type = 'multipleChoice';

  public type = 'multipleChoice';

  public placeholder?: string;

  public inputType: 'checkbox' | 'select' | 'tag-cloud';

  public options: MultipleChoice.Option[];

  // Renders only the value, not the input field.
  public preview?: boolean;

  constructor(id: string, title: string, options: MultipleChoice.Option[], description?: string, inputType: 'checkbox' | 'select' | 'tag-cloud' = 'checkbox', placeholder?: string) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.options = options;
    this.inputType = inputType;
    this.placeholder = placeholder;
  }

  public showPreview(): BaseField {
    this.preview = true;
    return this;
  }
}

export namespace MultipleChoice {
  export class Option {
    public label: string;
    public value: any;

    constructor(label: string, value: any) {
      this.label = label;
      this.value = value;
    }
  }
}

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputMultipleChoice
  disabled={disabled}
  errors={errors}
  field={field as MultipleChoice}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'multipleChoice' key for json form generations
registerField('multipleChoice', render);
