import { Input } from "antd";
import * as React from "react";
import { colors, metrics } from "../../constants";
import { IBaseInput, IBaseInputProps } from "../IBaseInput";
import { TextInput } from "./index";

export interface IProps extends IBaseInputProps<TextInput, string> {
}

export class InputText extends React.Component<IProps> implements IBaseInput<string> {

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
          <Input.TextArea
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
          type={field.inputType || 'text'}
          autoComplete="off"
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
}
