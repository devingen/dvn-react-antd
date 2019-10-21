import { Button, Checkbox, Form, Input } from 'antd';
import { RatingStars } from 'dvn-react-core';
import * as React from 'react';
import { convertToUniqueAlphanumberic, simpleTextDecorator } from '../utils';
import { ICommonFieldProps } from './FieldForm';

export const emptyFieldData = new RatingStars('', '');

class FieldFormRating extends React.Component<ICommonFieldProps> {

  public static defaultProps: Partial<ICommonFieldProps> = {
    data: undefined,
    disabled: false,
  };

  public handleSubmit() {
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        return;
      }

      const data = {
        ...(this.props.data || emptyFieldData),
        ...values,
        starCount: 5,
        type: RatingStars.type,
      };

      if (this.props.data) {
        // use existing id of the component
        data.id = this.props.data.id;
      } else {
        // generate id for the new component
        data.id = convertToUniqueAlphanumberic(values.title);
      }

      this.props.onSaveClick(data);
    });
  }

  public render() {
    const { fieldConfig, data, form, commonProps, disabled, strings } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="horizontal" onSubmit={() => this.handleSubmit()}>
        <Form.Item {...commonProps} label={strings.field.question}>
          {simpleTextDecorator(getFieldDecorator,
            'title', strings.field.question, data ? data.title : '', true, fieldConfig.titleMin, fieldConfig.titleMax, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.questionPlaceholder}
              disabled={disabled}
            />,
          )}
        </Form.Item>

        <Form.Item {...commonProps} label={strings.field.description}>
          {simpleTextDecorator(getFieldDecorator, 'description',
            strings.field.descriptionPlaceholder, data ? data.description : '', true, fieldConfig.descriptionMin, fieldConfig.descriptionMax, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.descriptionPlaceholder}
              disabled={disabled}
            />,
          )}
        </Form.Item>

        <Form.Item {...commonProps} label={strings.field.required}>
          {getFieldDecorator('required', { initialValue: data ? data.required : true, valuePropName: 'checked', })(
            <Checkbox disabled={disabled}>{strings.field.requiredDescription}</Checkbox>,
          )}
        </Form.Item>

        {/*<Form.Item {...commonProps} label={strings.field.ratingStars.starCount}>
          {getFieldDecorator('starCount', { initialValue: this.state.starCount })(
            <InputNumber
              min={5}
              max={10}
              placeholder={strings.field.ratingStars.starCount}
              disabled={disabled}
            />,
          )}
        </Form.Item>*/}

        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={() => this.props.onCancelClick()}
            style={{ marginRight: 5 }}
            disabled={disabled}
          >
            {strings.cancel}
          </Button>
          <Button onClick={() => this.handleSubmit()}>{strings.save}</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create({
  onValuesChange(props: ICommonFieldProps, changedValues: any, allValues: any) {
    if (props.onChange) {
      props.onChange({ ...(props.data || emptyFieldData), ...allValues });
    }
  },
})(FieldFormRating);
