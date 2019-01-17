import { BaseField, InputGenerator, registerField, SectionHeader } from 'dvn-react-core';
import * as React from 'react';
import { InputSectionHeader } from './InputSectionHeader';

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputSectionHeader
  disabled={disabled}
  field={field as SectionHeader}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
/>;

// register 'sectionHeader' key for json form generations
registerField('sectionHeader', render);
