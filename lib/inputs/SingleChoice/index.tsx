import * as React from "react";
import { registerField } from "../../form/InputGenerator";
import { BaseField, InputGenerator } from "../../models/BaseField";
import { InputSingleChoice } from "./InputSingleChoice";

export class SingleChoice extends BaseField {

  public static type = 'singleChoice';

  public type = 'singleChoice';

  public placeholder?: string;

  public inputType: 'radioButton' | 'select';

  public options: SingleChoice.Option[];

  constructor(id: string, title: string, options: SingleChoice.Option[], description?: string, inputType: 'radioButton' | 'select' = 'radioButton', placeholder?: string) {
    super();
    this.id = id;
    this.title = title;
    this.options = options;
    this.inputType = inputType;
    this.description = description;
    this.placeholder = placeholder;
  }
}

export module SingleChoice {
  export class Option {
    public label: string;
    public value: string | number;

    constructor(label: string, value: string | number) {
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
) => <InputSingleChoice
  disabled={disabled}
  errors={errors}
  field={field as SingleChoice}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'singleChoice' key for json form generations
registerField('singleChoice', render);
