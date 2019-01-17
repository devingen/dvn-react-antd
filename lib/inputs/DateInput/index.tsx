import { BaseField, DateInput, InputGenerator, registerField } from 'dvn-react-core';
import * as React from 'react';
import { InputDate } from './InputDate';

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

// register 'date' field for json form generations
registerField('date', render);
