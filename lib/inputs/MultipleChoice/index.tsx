import { BaseField, InputGenerator, MultipleChoice, registerField } from 'dvn-react-core';
import * as React from 'react';
import InputMultipleChoice from './InputMultipleChoice';

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
