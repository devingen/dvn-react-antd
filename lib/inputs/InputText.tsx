import * as React from 'react';
import { Input } from 'antd';
import { IBaseInput, IBaseInputProps } from './IBaseInput';
import { colors, metrics } from '../constants';
import { BaseField } from "../models/BaseField";
import { FieldTypes } from "../models/FieldTypes";

export class FieldText extends BaseField {

  public type: FieldTypes.Text;

  public placeholder: string;

  // Default number of lines to occupy vertically.
  public lines: number;

  // Maximum number of lines to occupy vertically.
  public linesMax: number;
}

const { TextArea } = Input;

export interface IProps extends IBaseInputProps<FieldText, string> {
}

class InputText extends React.Component<IProps> implements IBaseInput<string> {
  
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
    
    if (field.linesMax > 1 && field.linesMax >= field.lines) {
      return (
        <div>
          <TextArea
            id={field.id}
            autosize={{ minRows: field.lines, maxRows: field.linesMax }}
            disabled={disabled}
            placeholder={field.placeholder}
            onBlur={() => this.props.onBlur()}
            style={{ borderColor: hasError ? colors.error : undefined }}
            onChange={(e: any) => this.props.onChange(e.target.value)}
            value={value}
          />
          
          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <Input
          id={field.id}
          type="text"
          autoComplete="off"
          disabled={disabled}
          placeholder={field.description || field.title}
          onBlur={() => this.props.onBlur()}
          style={{ borderColor: hasError ? colors.error : undefined }}
          onChange={(e: any) => this.props.onChange(e.target.value)}
          value={value}
        />
        
        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}

export default InputText;
