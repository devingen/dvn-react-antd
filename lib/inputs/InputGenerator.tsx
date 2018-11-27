import { BaseField, InputGenerator } from '../models/BaseField';

const fieldTypeMap: Map<string, InputGenerator> = new Map<string, InputGenerator>();

export function registerField(fieldType: string, inputGenerator: InputGenerator) {
  fieldTypeMap.set(fieldType, inputGenerator);
}

export function generateInput(
  field: BaseField, value: any, errors: string[] = [], disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
): any {

  if (field.render) {
    return field.render(field, value, errors, disabled, onFieldChange, onFieldBlur);
  }

  const generator = fieldTypeMap.get(field.type);
  if (generator) {
    return generator(field, value, errors, disabled, onFieldChange, onFieldBlur);
  }

  return null;
}
