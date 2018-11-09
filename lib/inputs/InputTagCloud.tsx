import * as React from 'react';
import { Tag } from 'antd';
import { IBaseInput, IBaseInputProps } from './IBaseInput';
import { colors, metrics } from '../constants';
import { BaseField } from "../models/BaseField";
import { FieldTypes } from "../models/FieldTypes";

export class FieldTagCloud extends BaseField {

  public type: FieldTypes.TagCloud;

  public options: string[];

  public dictionary: object;

}

export interface IProps extends IBaseInputProps<FieldTagCloud, string[]> {
}

export interface IState {
  value: string[]
}

class InputTagCloud extends React.Component<IProps, IState> implements IBaseInput<string[]> {
  
  constructor(props: IProps) {
    super(props);
    
    this.state = {
      value: props.value || [],
    };
  }
  
  public onTagClick = (tag: string) => {
    const value = [...this.state.value];
    const index = value.indexOf(tag);
    if (index === -1) {
      value.push(tag);
    } else {
      value.splice(index, 1);
    }
    this.setState({ value }, () => this.props.onChange(value));
  };
  
  public render() {
    const { errors, field } = this.props;
    const { dictionary, options } = field;
    const { value } = this.state;
  
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;
    
    return (
      <div style={{ overflow: 'auto', marginBottom: metrics.verticalSpaceBetweenInputs }}>
        {(options || []).map(tag => (
          <Tag
            key={tag}
            color={value.indexOf(tag) > -1 ? 'blue' : undefined}
            onClick={() => this.onTagClick(tag)}
            style={{ margin: '2px' }}
          >
            {dictionary ? dictionary[tag] : tag}
          </Tag>))}
  
        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}

export default InputTagCloud;
