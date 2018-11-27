import * as React from 'react';
import { BaseField, InputGenerator } from '../../models/BaseField';
import { registerField } from '../InputGenerator';
import { InputRatingStars } from './InputRatingStars';

export class RatingStars extends BaseField {

  public static type = 'ratingStars';

  public type = 'ratingStars';

  public starCount: number;

  constructor(id: string, title: string, description?: string, starCount: number = 5) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.starCount = starCount;
  }
}

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
