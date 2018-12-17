import * as React from 'react';
import { Language } from '../../form/FormContext';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import { InputSubForm } from './InputSubForm';

export class SubForm extends BaseField {

  public static type = 'subForm';

  public type = 'subForm';

  public fields: BaseField[];

  public language?: Language;

  public layout?: 'horizontal' | 'vertical' | 'compact';

  public showFieldOrder?: boolean;

  constructor(
    id: string, title: string, fields: BaseField[], description?: string,
    layout?: 'horizontal' | 'vertical' | 'compact', showFieldOrder?: boolean, language?: Language) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;

    this.fields = fields;
    this.language = language;
    this.layout = layout;
    this.showFieldOrder = showFieldOrder;

    this.value = {};
  }
}

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputSubForm
  disabled={disabled}
  errors={errors}
  field={field as SubForm}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'subForm' key for json form generations
registerField('subForm', render);
