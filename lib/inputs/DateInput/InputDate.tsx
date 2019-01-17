import { DatePicker, TimePicker } from 'antd';
import { BaseInputProps, DateInput } from 'dvn-react-core';
import * as moment from 'moment';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<DateInput, Date> {
}

export class InputDate extends React.Component<IProps> {

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
          {(field.inputType === 'date' || field.inputType === 'dateTime') &&
          moment(value).format(field.dateFormat)
          }

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
          {(field.inputType === 'date' || field.inputType === 'dateTime') &&
          <DatePicker
            id={`${field.id}-date`}
            disabled={disabled}
            format={field.dateFormat}
            onChange={this.onDateChange}
            placeholder={field.placeholder}
            style={{
              borderColor: hasError ? colors.error : undefined,
              width: field.inputType === 'date' ? '100%' : '49%'
            }}
            value={value && moment(value, field.dateFormat)}
          />
          }

          {(field.inputType === 'time' || field.inputType === 'dateTime') &&
          <TimePicker
            disabled={disabled}
            format={field.timeFormat}
            onChange={this.onTimeChange}
            style={{
              borderColor: hasError ? colors.error : undefined,
              marginLeft: field.inputType === 'time' ? '0' : '2%',
              width: field.inputType === 'time' ? '100%' : '49%',
            }}
            value={value && moment(value, field.dateFormat)}
          />
          }
        </div>

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </React.Fragment>
    );
  }

  private onDateChange = (momentDate: moment.Moment) => {
    const { value } = this.props;
    const date = momentDate.toDate();

    if (value) {
      date.setHours(value.getHours());
      date.setMinutes(value.getMinutes());
      date.setSeconds(value.getSeconds());
      date.setMilliseconds(value.getMilliseconds());
    }
    this.props.onChange(date);
  };

  private onTimeChange = (momentDate: moment.Moment) => {
    const { value } = this.props;
    const date = momentDate.toDate();

    if (value) {
      date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
    }
    this.props.onChange(date);
  };
}
