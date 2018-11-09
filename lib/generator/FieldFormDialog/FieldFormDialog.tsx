import * as React from 'react';
import FieldDisplay from '../FieldDisplays/FieldDisplay';
import FieldForm from '../FieldForm/FieldForm';
import * as FieldFormSingleChoice from '../FieldForm/FieldFormSingleChoice';
import * as FieldFormText from '../FieldForm/FieldFormText';
import * as FieldFormRating from '../FieldForm/FieldFormRating';
import { FieldTypes } from '../../models/FieldTypes';

import './FieldFormDialog.css';
import { Icon } from 'antd';

export interface IProps {
  field?: any
  fieldType: FieldTypes
  onSave: (fieldData: any) => void
  onDismiss: () => void
  strings: any
}

export interface IState {
  field: any
}

function getEmptyFieldData(fieldType: FieldTypes): any {
  switch (fieldType) {
    case FieldTypes.RatingStars:
      return FieldFormRating.emptyFieldData;
    case FieldTypes.SingleChoice:
      return FieldFormSingleChoice.emptyFieldData;
    case FieldTypes.Text:
      return FieldFormText.emptyFieldData;
  }
}

class FieldFormDialog extends React.Component<IProps, IState> {
  
  public constructor(props: IProps) {
    super(props);
    
    this.state = {
      field: props.field,
    };
  }
  
  public render() {
    const { fieldType, onDismiss, onSave, strings } = this.props;
    const { field } = this.state;
    
    return (
      <div className="field-form-dialog-container">
        <div className="field-form-dialog">
          <div className="left">
            <h2>{strings.field.preview}</h2>
            
            <div className="input-container">
              <FieldDisplay
                showControls={false}
                isPending={false}
                field={field || getEmptyFieldData(fieldType)}
                layout={'vertical'}
              />
            </div>
          </div>
          <div className="right">
            <div className="title-container">
              <h2>{strings.field.questionSettings}</h2>
              <Icon
                type="close"
                onClick={() => onDismiss()}
              />
            </div>
            
            <div className="form-container">
              <FieldForm
                strings={strings}
                fieldData={field}
                fieldType={fieldType}
                onChange={data => this.setState({ field: { ...this.state.field, ...data } })}
                onCancelClick={() => onDismiss()}
                onSaveClick={(f) => onSave(f)}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FieldFormDialog;
