/* tslint:disable:no-empty-interface */
import { BaseField } from '../models/BaseField';

export interface IBaseInput<V> {
  // setValue: (value: V) => void
  // getValue: () => V | undefined
}

export interface IBaseInputProps<F extends BaseField, V> {
  disabled?: boolean
  field: F
  errors?: any[]
  onBlur: () => void
  onChange: (value?: V) => void
  value?: V
}
