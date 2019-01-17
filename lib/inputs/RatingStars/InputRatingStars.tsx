import { Rate } from 'antd';
import { BaseInputProps, RatingStars } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<RatingStars, number> {
}

export class InputRatingStars extends React.Component<IProps> {

  public render() {
    const { disabled, field, errors, onChange, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    // convert the floating number to the star count
    // (ex: 0.8 should be 4 stars if the start count is 5 and should be 8 stars if star count is 10)
    const shownValue = field.starCount * (value || 0);

    return (
      <div>
        <Rate
          count={field.starCount}
          disabled={disabled || field.preview}
          onChange={v => onChange(v / field.starCount)}
          value={shownValue}
        />

        <div className="error" style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
