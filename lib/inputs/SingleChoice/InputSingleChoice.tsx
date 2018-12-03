import { Radio, Select } from 'antd';
import * as React from 'react';
import { colors, metrics } from '../../constants';
import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { SingleChoice } from './index';

export interface IProps extends IBaseInputProps<SingleChoice, any[]> {
}

export class InputSingleChoice extends React.Component<IProps> implements IBaseInput<any[]> {

  public render() {
    const { disabled, field, errors, value, onChange } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    if (field.preview) {
      const selectedOption = field.options.find(o => o.value === value);
      return (
        <div>
          {selectedOption ? selectedOption.label : ''}

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    const name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    // render select
    if (field.inputType === 'select') {
      return (
        <div>
          <Select
            id={field.id + '.select'}
            disabled={disabled}
            placeholder={field.placeholder}
            dropdownMatchSelectWidth={true}
            onChange={(v: any) => onChange(v)}
            style={{ minWidth: 200 }}
            value={value as any}>
            {field.options.map((o: any) => {

              if (o.group && o.options) {
                // render grouped options
                return (
                  <Select.OptGroup key={o.group} label={o.group}>
                    {o.options.map((ogo: any) =>
                      <Select.Option
                        key={ogo.value}
                        value={ogo.value}>
                        {ogo.label}
                      </Select.Option>,
                    )}
                  </Select.OptGroup>
                );

              } else {
                // render simple options
                return (
                  <Select.Option
                    key={o.value}
                    value={o.value}>
                    {o.label}
                  </Select.Option>
                );
              }

            })}
          </Select>

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    // render radio buttons as default
    return (
      <div>
        <div style={{ fontSize: '0.9em' }}>
          <Radio.Group
            name={name}
            style={{ marginTop: '0.2rem' }}
            onChange={(e: any) => onChange(e.target.value)}
            value={value}
          >
            {(field.options || []).map((o: any) =>
              <Radio
                key={o.value}
                value={o.value}
                disabled={disabled}
                style={{ display: 'block', height: '30px', lineHeight: '30px' }}
              >{o.label}</Radio>,
            )}
          </Radio.Group>
        </div>

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
