import * as React from 'react';
import { BaseField } from '../../../models/BaseField';
import { RatingStars } from '../../RatingStars/index';
import { SingleChoice } from '../../SingleChoice/index';
import { TextInput } from '../../TextInput/index';
import { convertToUniqueAlphanumberic } from '../utils';
import FieldFormRating from './FieldFormRating';
import FieldFormSingleChoice from './FieldFormSingleChoice';
import FieldFormText from './FieldFormText';

export interface IProps {
  fieldData?: any
  fieldType: string

  onChange?: (data: any) => void
  onSaveClick: (field: any) => void
  onCancelClick: () => void

  disabled: boolean
  strings: object
}

export interface ICommonFieldProps {
  // data is used to update an existing component
  data?: any

  form: any
  commonProps: any

  onChange?: (data: any) => void
  onSaveClick: (data: any) => void
  onCancelClick: () => void

  disabled: boolean
  strings: any
}

class FieldForm extends React.Component<IProps> {

  public onSaveClick(data: BaseField) {

    if (!data.id || data.id === '') {
      // generate id for the new component
      data.id = convertToUniqueAlphanumberic(data.title);
    }

    this.props.onSaveClick(data);
  }

  public render() {
    const { fieldType, fieldData, disabled, strings } = this.props;

    const commonProps = {
      hasFeedback: false,
      labelCol: { span: 4 },
      style: { marginBottom: 5 },
      wrapperCol: { span: 20 },
    };

    const type = fieldData ? fieldData.type : fieldType;

    return (
      <div style={{ padding: '1rem 0.5rem', background: '#f8f8f8' }}>

        {type === SingleChoice.type &&
        <FieldFormSingleChoice
          data={fieldData}
          disabled={disabled}
          strings={strings}
          commonProps={commonProps}
          onChange={this.props.onChange}
          onSaveClick={(data) => this.onSaveClick(data)}
          onCancelClick={this.props.onCancelClick}
        />
        }

        {type === TextInput.type &&
        <FieldFormText
          data={fieldData}
          strings={strings}
          disabled={disabled}
          commonProps={commonProps}
          onChange={this.props.onChange}
          onSaveClick={(data) => this.onSaveClick(data)}
          onCancelClick={this.props.onCancelClick}
        />
        }

        {type === RatingStars.type &&
        <FieldFormRating
          data={fieldData}
          strings={strings}
          disabled={disabled}
          commonProps={commonProps}
          onChange={this.props.onChange}
          onSaveClick={(data) => this.onSaveClick(data)}
          onCancelClick={this.props.onCancelClick}
        />
        }

      </div>
    );
  }
}

export default FieldForm;
