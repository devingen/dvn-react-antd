import * as React from 'react';
import { Checkbox, Select } from 'antd';
import { IBaseInput, IBaseInputProps } from './IBaseInput';
import { colors, metrics } from '../constants';
import { BaseField } from "../models/BaseField";
import { FieldTypes } from "../models/FieldTypes";

export class FieldMultipleChoice extends BaseField {

  public type: FieldTypes.MultipleChoice;

  public placeholder: string;

  public inputType: 'checkbox' | 'select';

  public options: any[];
}

export class MultipleChoiceOption {
  public label: string;
  public value: string;
}

export interface IProps extends IBaseInputProps<FieldMultipleChoice, any[]> {
}

class InputMultipleChoice extends React.Component<IProps> implements IBaseInput<MultipleChoiceOption[]> {
  
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
    
    // const name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    
    // render select
    if (field.inputType === 'select') {
      return (
        <div>
          <Select
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
    }
    
    // render radio buttons as default
    return (
      <div>
        <div style={{ fontSize: '0.9em' }}>
          {(field.options || []).map((o: any) =>
            <Checkbox
              name={o.value}
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

export default InputMultipleChoice;
