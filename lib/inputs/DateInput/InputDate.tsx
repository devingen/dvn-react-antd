import { DatePicker } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { colors, metrics } from '../../constants';
import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { DateInput } from './index';

export interface IProps extends IBaseInputProps<DateInput, Date> {
}

export class InputDate extends React.Component<IProps> implements IBaseInput<Date> {

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

    if (field.preview) {
      return (
        <div>
          {moment(value).format(field.dateFormat)}

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    return (
      <div>
        <DatePicker
          id={field.id}
          disabled={disabled}
          style={{ borderColor: hasError ? colors.error : undefined, width: '100%' }}
          onChange={(date: moment.Moment) => this.props.onChange(date.toDate())}
          placeholder={field.placeholder}
          value={value && moment(value, field.dateFormat)}
          format={field.dateFormat}
        />

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
