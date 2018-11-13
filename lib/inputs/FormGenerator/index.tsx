import * as React from "react";
import { registerField } from "../../form/InputGenerator";
import { BaseField, InputGenerator } from "../../models/BaseField";
import { InputFormGenerator } from "./FormGenerator";

export class FormGenerator extends BaseField {

  public static type = 'formGenerator';

  public type = 'formGenerator';

  public language: string;

  public inline: boolean;

  public strings: any;

  constructor(language: string, inline: boolean) {
    super();
    this.language = language;
    this.inline = inline;
  }
}

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputFormGenerator
  disabled={disabled}
  errors={errors}
  field={field as FormGenerator}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'formGenerator' key for json form generations
registerField('formGenerator', render);
