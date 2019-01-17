import { BaseField, InputGenerator, registerField, SubForm } from 'dvn-react-core';
import * as React from 'react';
import { InputSubForm } from './InputSubForm';

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
