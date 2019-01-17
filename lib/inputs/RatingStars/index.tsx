import { BaseField, InputGenerator, RatingStars, registerField } from 'dvn-react-core';
import * as React from 'react';
import { InputRatingStars } from './InputRatingStars';

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputRatingStars
  disabled={disabled}
  errors={errors}
  field={field as RatingStars}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'ratingStars' key for json form generations
registerField('ratingStars', render);
