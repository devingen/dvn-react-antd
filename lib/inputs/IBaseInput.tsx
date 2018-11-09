/* tslint:disable:no-empty-interface */
import { BaseField } from '..';

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
