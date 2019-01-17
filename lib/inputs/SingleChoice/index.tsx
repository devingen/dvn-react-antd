import { BaseField, InputGenerator, registerField, SingleChoice } from 'dvn-react-core';
import * as React from 'react';
import { InputSingleChoice } from './InputSingleChoice';

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
