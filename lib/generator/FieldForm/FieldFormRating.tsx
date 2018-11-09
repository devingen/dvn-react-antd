import * as React from 'react';
import { Input, Button, Form, Checkbox } from 'antd';
import { ICommonFieldProps } from './FieldForm';
import { convertToUniqueAlphanumberic, simpleTextDecorator } from '../utils';
import { FieldTypes } from '../../models/FieldTypes';
import { FieldRatingStars } from "../../inputs/InputRatingStars";

export const emptyFieldData: FieldRatingStars = {
  id: '',
  required: true,
  starCount: 5,
  title: '',
  type: FieldTypes.RatingStars,
};

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
        type: FieldTypes.RatingStars,
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
    const { data, form, commonProps, disabled, strings } = this.props;
    const { getFieldDecorator } = form;
    
    return (
      <Form layout="horizontal" onSubmit={() => this.handleSubmit()}>
        <Form.Item {...commonProps} label={strings.field.question}>
          {simpleTextDecorator(getFieldDecorator,
            'title', strings.field.question, data ? data.title : '', true, 3, 100, [], strings)(
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
            strings.field.descriptionPlaceholder, data ? data.description : '', false, 3, 100, [], strings)(
            <Input
              type="text"
              autoComplete="off"
              placeholder={strings.field.descriptionPlaceholder}
              disabled={disabled}
            />,
          )}
        </Form.Item>
  
        <Form.Item {...commonProps} label={strings.field.required}>
          {getFieldDecorator('required', { initialValue: data ? data.required : true, valuePropName: 'checked',  })(
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
  onValuesChange(props: ICommonFieldProps, changedValues, allValues) {
    if (props.onChange) {
      props.onChange({ ...(props.data || emptyFieldData), ...allValues });
    }
  },
})(FieldFormRating);
