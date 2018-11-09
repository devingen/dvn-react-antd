import * as React from 'react';
import { BaseField } from '..';
import { FieldTypes } from '../models/FieldTypes';

import FormGenerator, { FieldFormGenerator } from "../generator/FormGenerator";
import InputText, { FieldText } from '../inputs/InputText';
import InputTagCloud, { FieldTagCloud } from '../inputs/InputTagCloud';
import InputSectionHeader, { FieldSectionHeader } from '../inputs/InputSectionHeader';
import InputSingleChoice, { FieldSingleChoice } from '../inputs/InputSingleChoice';
import InputRatingStars, { FieldRatingStars } from '../inputs/InputRatingStars';
import InputMultipleChoice, { FieldMultipleChoice } from '../inputs/InputMultipleChoice';

export function generateInput(
  field: BaseField, value: any, errors: any[], disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
): any {
  
  if (field.render) {
    return field.render(field, value, errors, disabled, onFieldChange, onFieldBlur);
  }
  
  switch (field.type) {
    case FieldTypes.FormGenerator:
      return <FormGenerator
        disabled={disabled}
        errors={errors}
        field={field as FieldFormGenerator}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    case FieldTypes.SingleChoice:
      return <InputSingleChoice
        disabled={disabled}
        errors={errors}
        field={field as FieldSingleChoice}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    case FieldTypes.MultipleChoice:
      return <InputMultipleChoice
        disabled={disabled}
        errors={errors}
        field={field as FieldMultipleChoice}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    case FieldTypes.RatingStars:
      return <InputRatingStars
        disabled={disabled}
        errors={errors}
        field={field as FieldRatingStars}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    case FieldTypes.SectionHeader:
      return <InputSectionHeader
        disabled={disabled}
        field={field as FieldSectionHeader}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
      />;
    case FieldTypes.TagCloud:
      return <InputTagCloud
        disabled={disabled}
        field={field as FieldTagCloud}
        errors={errors}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    case FieldTypes.Text:
      return <InputText
        disabled={disabled}
        field={field as FieldText}
        errors={errors}
        onChange={(v: any) => onFieldChange(field, v)}
        onBlur={() => onFieldBlur(field)}
        value={value}
      />;
    default:
      return undefined;
  }
  
}