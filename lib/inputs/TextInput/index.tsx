import { BaseField, InputGenerator, registerField, TextInput } from 'dvn-react-core';
import * as React from 'react';
import { InputText } from './InputText';

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
