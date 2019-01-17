import { BaseField, InputGenerator, NumberInput, registerField } from 'dvn-react-core';
import * as React from 'react';
import { InputNumber } from './InputNumber';

// component generator
const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputNumber
  disabled={disabled}
  field={field as NumberInput}
  errors={errors}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'number' field for json form generations
registerField('number', render);
