import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { NumberInput } from 'dvn-react-core';
import * as React from 'react';
import { simpleTextDecorator } from '../utils';
import { ICommonFieldProps } from './FieldForm';

export const emptyFieldData = new NumberInput('', '');

const FormItem = Form.Item;

class DynamicFieldNumberForm extends React.Component<ICommonFieldProps> {

  public handleSubmit() {
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        return;
      }

      const data: NumberInput = {
        ...(this.props.data || emptyFieldData),
        ...values,
        type: NumberInput.type,
      };

      this.props.onSaveClick(data);
    });
  }

  public render() {
    const { fieldConfig, data, form, commonProps, disabled, strings } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="horizontal" onSubmit={() => this.handleSubmit()}>
        <FormItem {...commonProps} label={strings.field.question}>
          {simpleTextDecorator(getFieldDecorator,
            'title', strings.field.question, data ? data.title : '', true, fieldConfig.titleMin, fieldConfig.titleMax, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.questionPlaceholder}
              disabled={disabled}
            />,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.description}>
          {simpleTextDecorator(getFieldDecorator, 'description',
            strings.field.descriptionPlaceholder, data ? data.description : '', false, fieldConfig.descriptionMin, fieldConfig.descriptionMax, [], strings)(
            <Input.TextArea
              autosize={{ minRows: 3, maxRows: 20 }}
              autoComplete="off"
              placeholder={strings.field.descriptionPlaceholder}
              disabled={disabled}
            />,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.required}>
          {getFieldDecorator('required', { initialValue: data ? data.required : true, valuePropName: 'checked' })(
            <Checkbox disabled={disabled}>{strings.field.requiredDescription}</Checkbox>,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.numberField.placeholder}>
          {simpleTextDecorator(getFieldDecorator, 'placeholder',
            strings.field.numberField.placeholder, data ? data.placeholder : '', false, 3, 100, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.numberField.placeholderPlaceholder}
              disabled={disabled}
            />,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.numberField.min}>
          {getFieldDecorator('min', { initialValue: data && data.min })(
            <InputNumber
              min={0}
              placeholder={strings.field.numberField.min}
              disabled={disabled}
              style={{ minWidth: 120 }}
            />,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.numberField.max}>
          {getFieldDecorator('max', { initialValue: data && data.max })(
            <InputNumber
              min={0}
              placeholder={strings.field.numberField.max}
              disabled={disabled}
              style={{ minWidth: 120 }}
            />,
          )}
        </FormItem>

        <FormItem {...commonProps} label={strings.field.numberField.step}>
          {getFieldDecorator('step', { initialValue: data ? data.step : 1 })(
            <InputNumber
              min={0}
              placeholder={strings.field.numberField.step}
              disabled={disabled}
            />,
          )}
        </FormItem>

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
})(DynamicFieldNumberForm);
