import { Rate } from 'antd';
import * as React from 'react';
import { colors, metrics } from '../../constants';

import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { RatingStars } from './index';

export interface IProps extends IBaseInputProps<RatingStars, number> {
}

export class InputRatingStars extends React.Component<IProps> implements IBaseInput<number> {

  public render() {
    const { disabled, field, errors, onChange, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    // convert the floating number to the star count
    // (ex: 0.8 should be 4 stars if the start count is 5 and should be 8 stars if star count is 10)
    const shownValue = field.starCount * (value || 0);

    return (
      <div style={{}}>
        <Rate count={field.starCount} disabled={disabled} onChange={v => onChange(v)} value={shownValue} />

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
