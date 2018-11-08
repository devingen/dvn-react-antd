import * as React from 'react';
import { Input, InputNumber, Button, Form, Checkbox } from 'antd';
import { simpleTextDecorator } from '../utils';
import { ICommonFieldProps } from './FieldForm';
import { FieldTypes } from '../../models/FieldTypes';
import { FieldText } from "../..";

export const emptyFieldData: FieldText = {
  id: '',
  lines: 1,
  linesMax: 3,
  placeholder: '',
  required: true,
  title: '',
  type: FieldTypes.Text,
};

const FormItem = Form.Item;

class DynamicFieldTextForm extends React.Component<ICommonFieldProps> {
  
  public handleSubmit() {
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        return;
      }
      
      const data: FieldText = {
        ...(this.props.data || emptyFieldData),
        ...values,
        type: FieldTypes.Text,
      };
      
      this.props.onSaveClick(data);
    });
  }
  
  public render() {
    const { data, form, commonProps, disabled, strings } = this.props;
    const { getFieldDecorator } = form;
    
    return (
      <Form layout="horizontal" onSubmit={() => this.handleSubmit()}>
        <FormItem {...commonProps} label={strings.field.question}>
          {simpleTextDecorator(getFieldDecorator,
            'title', strings.field.question, data ? data.title : '', true, 3, 100, [], strings)(
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
            strings.field.descriptionPlaceholder, data ? data.description : '', false, 3, 100, [], strings)(
            <Input
              type="text"
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
        
        <FormItem {...commonProps} label={strings.field.textField.placeholder}>
          {simpleTextDecorator(getFieldDecorator, 'placeholder',
            strings.field.textField.placeholder, data ? data.placeholder : '', false, 3, 100, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.textField.placeholderPlaceholder}
              disabled={disabled}
            />,
          )}
        </FormItem>
        
        <FormItem {...commonProps} label={strings.field.textField.lineCount}>
          {getFieldDecorator('lines', { initialValue: data ? data.lines : 1 })(
            <InputNumber
              min={1}
              max={10}
              placeholder={strings.field.textField.lineCount}
              disabled={disabled}
            />,
          )}
        </FormItem>
        
        <FormItem {...commonProps} label={strings.field.textField.maxLineCount}>
          {getFieldDecorator('linesMax', { initialValue: data ? data.linesMax : 3 })(
            <InputNumber
              min={1}
              max={20}
              placeholder={strings.field.textField.maxLineCount}
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
  onValuesChange(props: ICommonFieldProps, changedValues, allValues) {
    if (props.onChange) {
      props.onChange({ ...(props.data || emptyFieldData), ...allValues });
    }
  },
})(DynamicFieldTextForm);
