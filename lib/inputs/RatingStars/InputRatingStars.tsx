import { Rate } from 'antd';
import * as React from 'react';
import { colors, metrics } from '../../constants';

import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { RatingStars } from "./index";

export interface IProps extends IBaseInputProps<RatingStars, number> {
}

export class InputRatingStars extends React.Component<IProps> implements IBaseInput<number> {

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
