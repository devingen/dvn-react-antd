import { Checkbox, Select, Tag } from 'antd';
import { BaseInputProps, MultipleChoice } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<MultipleChoice, any[]> {
}

export default class InputMultipleChoice extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  public onOptionClick(optionValue: string) {
    const selectedOptions = this.props.value || [];
    if (selectedOptions) {
      if (selectedOptions.indexOf(optionValue) === -1) {
        this.props.onChange([...selectedOptions, optionValue]);
      } else {
        selectedOptions.splice(selectedOptions.indexOf(optionValue), 1);
        this.props.onChange(selectedOptions);
      }
    }
  }

  public render() {
    const { disabled, field, errors, value, onChange } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    if (field.preview) {

      if (field.inputType === 'tag-cloud') {
        return (
          <div>
            {getSelectedOptions(field.options, value).map(o =>
              <Tag key={o.value} style={{ margin: '2px' }}>{o.label}</Tag>
            )}

            <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
              {error}
            </div>
          </div>
        );
      }

      return (
        <div>
          {getOptionLabels(field.options, value)}

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    if (field.inputType === 'select') {

      // render select
      return (
        <div>
          <Select
            mode="multiple"
            disabled={disabled}
            placeholder={field.placeholder}
            dropdownMatchSelectWidth={true}
            onChange={(v: any) => onChange(v)}
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
    } else if (field.inputType === 'tag-cloud') {

      // render tag cloud
      return (
        <div style={{ overflow: 'auto', marginBottom: metrics.verticalSpaceBetweenInputs }}>
          {(field.options || []).map((o: any) =>
            <Tag
              key={o.value}
              color={value && value.indexOf(o.value) > -1 ? 'blue' : undefined}
              onClick={() => this.onOptionClick(o.value)}
              style={{ margin: '2px' }}
            >
              {o.label}
            </Tag>
          )}

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    // render checkbox as default
    return (
      <div>
        <div style={{ fontSize: '0.9em' }}>
          {(field.options || []).map((o: any) =>
            <Checkbox
              name={String(o.value)}
              key={o.value}
              value={o.value}
              checked={value && value.indexOf(o.value) > -1}
              disabled={disabled}
              style={{ display: 'block', height: '30px', lineHeight: '30px', marginLeft: 0 }}
              onChange={() => this.onOptionClick(o.value)}
            >
              {o.label}
            </Checkbox>,
          )}
        </div>

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}

/**
 * Returns the options that are in the value.
 * @param options
 * @param value
 */
export function getSelectedOptions(options: MultipleChoice.Option[], value?: any[]): MultipleChoice.Option[] {

  if (!value) {
    return [];
  }

  return options.filter(o => value.indexOf(o.value) > -1);
}

/**
 * Returns the labels of the given options that are joined with comma.
 * @param options
 * @param value
 */
export function getOptionLabels(options: MultipleChoice.Option[], value?: any[]): string {

  if (!value) {
    return '';
  }

  return getSelectedOptions(options, value).map(o => o.label).join(', ');
}
