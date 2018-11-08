import * as React from 'react';
import { Rate } from 'antd';

import { IBaseInput, IBaseInputProps } from './IBaseInput';
import { colors, metrics } from '../constants';
import { BaseField } from "../models/BaseField";
import { FieldTypes } from "../models/FieldTypes";

export class FieldRatingStars extends BaseField {

  public type: FieldTypes.RatingStars;

  public starCount: number
}

export interface IProps extends IBaseInputProps<FieldRatingStars, number> {
}

export interface IState {
  value?: number
}

class InputRatingStars extends React.Component<IProps, IState> implements IBaseInput<number> {
  
  constructor(props: IProps) {
    super(props);
    
    this.state = {
      value: props.value,
    };
  }
  
  public render() {
    const { disabled, field, errors, onChange } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;
    
    return (
      <div style={{}}>
        <Rate count={field.starCount} disabled={disabled} onChange={v => onChange(v)} />
        
        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}

export default InputRatingStars;
