import { Icon } from 'antd';
import { MultipleChoice, NumberInput, RatingStars, SingleChoice, TextInput } from 'dvn-react-core';
import * as React from 'react';
import FieldDisplay from '../FieldDisplays/FieldDisplay';
import FieldForm from '../FieldForm/FieldForm';
import * as FieldFormMultipleChoice from '../FieldForm/FieldFormMultipleChoice';
import * as FieldFormNumber from '../FieldForm/FieldFormNumber';
import * as FieldFormRating from '../FieldForm/FieldFormRating';
import * as FieldFormSingleChoice from '../FieldForm/FieldFormSingleChoice';
import * as FieldFormText from '../FieldForm/FieldFormText';

import './FieldFormDialog.css';

export interface IProps {
  field?: any
  fieldType: string
  onSave: (fieldData: any) => void
  onDismiss: () => void
  strings: any
}

export interface IState {
  field: any
}

function getEmptyFieldData(fieldType: string): any {
  switch (fieldType) {
    case MultipleChoice.type:
      return FieldFormMultipleChoice.emptyFieldData;
    case NumberInput.type:
      return FieldFormNumber.emptyFieldData;
    case RatingStars.type:
      return FieldFormRating.emptyFieldData;
    case SingleChoice.type:
      return FieldFormSingleChoice.emptyFieldData;
    case TextInput.type:
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
