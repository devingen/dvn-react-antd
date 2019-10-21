import { BaseField, InputGenerator, registerField } from 'dvn-react-core';
import * as React from 'react';
import { InputFormGenerator } from './InputFormGenerator';

export interface IFieldFormConfig {
  descriptionMax: number;
  descriptionMin: number;
  titleMax: number;
  titleMin: number;
}

export class FormGenerator extends BaseField {

  public static type = 'formGenerator';

  public type = 'formGenerator';

  public language: string;

  public inline: boolean;

  public strings: any;

  public fieldConfig: IFieldFormConfig;

  constructor(id: string, language: string, inline: boolean, fieldConfig?: IFieldFormConfig) {
    super();
    this.id = id;
    this.language = language;
    this.inline = inline;
    this.fieldConfig = {
      descriptionMax: 100,
      descriptionMin: 0,
      titleMax: 100,
      titleMin: 1,
      ...(fieldConfig || {}),
    };
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
