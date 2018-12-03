import { InputNumber as AntdInputNumber } from 'antd';
import * as React from 'react';
import { colors, metrics } from '../../constants';
import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { NumberInput } from './index';

export interface IProps extends IBaseInputProps<NumberInput, number> {
}

export class InputNumber extends React.Component<IProps> implements IBaseInput<string> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  public render() {
    const { disabled, field, errors, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    if (field.preview) {
      return (
        <div>
          {value}

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    return (
      <div>
        <AntdInputNumber
          id={field.id}
          disabled={disabled}
          placeholder={field.placeholder}
          onBlur={() => this.props.onBlur()}
          style={{ borderColor: hasError ? colors.error : undefined, width: '100%' }}
          onChange={(v: number) => this.props.onChange(v)}
          value={value}
          step={field.step}
          max={field.max}
          min={field.min}
        />

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
