import { Button, Dropdown, Icon, Menu, Modal } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import * as cn from 'classnames';
import * as React from 'react';
import { colors } from '../../constants';
import { BaseField } from '../../models/BaseField';
import { IBaseInput, IBaseInputProps } from '../IBaseInput';
import { MultipleChoice } from '../MultipleChoice';
import { NumberInput } from '../NumberInput';
import { RatingStars } from '../RatingStars';
import { SingleChoice } from '../SingleChoice';
import { TextInput } from '../TextInput';
import { getStrings } from './defaultStrings';

import FieldDisplay from './FieldDisplays/FieldDisplay';
import FieldFormDialog from './FieldFormDialog/FieldFormDialog';
import { FormGenerator } from './index';

import './InputFormGenerator.css';
import { swapArray } from './utils';

export interface IProps extends IBaseInputProps<FormGenerator, BaseField[]> {
}

export interface IState {
  value: BaseField[]
  componentBeingEdited: string
  fieldBeingEdited?: any
  fieldType?: string
  isAddingField: boolean
}

export class InputFormGenerator extends React.Component<IProps, IState> implements IBaseInput<FormData> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      componentBeingEdited: '',
      fieldBeingEdited: undefined,
      fieldType: undefined,
      isAddingField: false,
      value: props.value || [],
    };
  }

  public componentWillReceiveProps(nProps: IProps) {
    if (nProps.value) {
      this.setState({ value: nProps.value });
    }
  }

  public render() {
    const { errors, field: fieldData, value, onChange, disabled = false } = this.props;
    const { inline, language } = fieldData;
    const fields = value || [];

    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    let order = 0;

    const strings = fieldData.strings || getStrings(language);

    return (
      <div
        className={cn('form-generator', { 'inline': inline })}
      >
        {(fields.length === 0 && !this.state.isAddingField) &&
        <div className="empty-message">
          {strings.noQuestionInForm}
        </div>
        }

        {(this.state.isAddingField || this.state.fieldBeingEdited) &&
        <FieldFormDialog
          field={this.state.fieldBeingEdited}
          fieldType={this.state.fieldType!}
          onSave={(newOrEditedField) => {

            if (this.state.isAddingField) {
              // add new field
              onChange([...this.state.value, newOrEditedField]);

              this.setState({ isAddingField: false });
            } else if (this.state.fieldBeingEdited) {

              // update existing field
              const updatedComponents = [...fields];
              for (let i = 0; i < fields.length; i += 1) {
                if (fields[i].id === newOrEditedField.id) {
                  updatedComponents[i] = newOrEditedField;
                  break;
                }
              }
              onChange(updatedComponents);
              this.setState({ fieldBeingEdited: undefined });
            }
          }}
          onDismiss={() => this.setState({ fieldBeingEdited: undefined, isAddingField: false })}
          strings={strings}
        />
        }

        {fields.map((field: any) => {

          if (field.title && field.title !== '') {
            order += 1;
          }

          return (
            <FieldDisplay
              key={field.id}
              order={order}
              showControls={true}
              isPending={disabled || false}
              field={field}
              layout={'vertical'}
              onUpClick={(id: string) => this.moveComponentUp(id)}
              onDownClick={(id: string) => this.moveComponentDown(id)}
              onEditClick={() => this.setState({ fieldBeingEdited: field })}
              onDeleteClick={(id: string) => {
                this.onDeleteClick(fields, id);
              }}
            />
          );
        })}

        {(!this.state.isAddingField && !this.state.componentBeingEdited) &&
        <AddQuestionOptions
          options={[{
            icon: 'font-size',
            label: strings.textField,
            type: TextInput.type,
          }, {
            icon: 'calculator',
            label: strings.numberField,
            type: NumberInput.type,
          }, {
            icon: 'check-circle',
            label: strings.singleChoice,
            type: SingleChoice.type,
          }, {
            icon: 'check-square',
            label: strings.multipleChoice,
            type: MultipleChoice.type,
          }, {
            icon: 'star-o',
            label: strings.ratingStars,
            type: RatingStars.type,
          }]}
          onSelect={type => this.setState({ isAddingField: true, fieldType: type })}
          disabled={disabled}
          strings={strings}
        />
        }

        {error &&
        <div style={{ color: colors.error, marginTop: '1rem' }}>
          {error}
        </div>
        }
      </div>
    );
  }

  private onDeleteClick(components: any[], id: string) {
    const strings = this.props.field.strings || getStrings(this.props.field.language);

    Modal.confirm({
      cancelText: strings.no,
      content: strings.deleteConfirmationMessage,
      okText: strings.yes,
      okType: 'danger',
      onOk: () => {
        const updatedComponents = [...components];
        for (let i = 0; i < components.length; i += 1) {
          if (components[i].id === id) {
            updatedComponents.splice(i, 1);
            break;
          }
        }

        this.props.onChange(updatedComponents);
      },
      title: strings.deleteConfirmationTitle,
    });
  }

  private moveComponentUp(id: string) {
    const components = [...this.state.value];

    for (let i = 0; i < components.length; i += 1) {
      if (components[i].id === id) {
        if (i === 0) {
          return;
        }

        swapArray(components, i, i - 1);
        break;
      }
    }

    this.props.onChange(components);
  }

  private moveComponentDown(id: string) {
    const components = [...this.state.value];

    for (let i = 0; i < components.length; i += 1) {
      if (components[i].id === id) {
        if (i === components.length - 1) {
          return;
        }

        swapArray(components, i, i + 1);
        break;
      }
    }

    this.props.onChange(components);
  }
}

export interface IAddQuestionOptionsProps {
  disabled: boolean
  options: any[]
  onSelect: (type: string) => void
  strings: any
}

const AddQuestionOptions = ({ strings, disabled, options, onSelect }: IAddQuestionOptionsProps) => (
  <div className="add-question-options">
    <Dropdown
      overlay={
        <Menu onClick={(type: ClickParam) => {
          if (!disabled) {
            onSelect(type.key);
          }
        }}>
          {options.map((option: any) => (
            <Menu.Item key={option.type}>
              <Icon type={option.icon} style={{ fontSize: '1em', marginBottom: '0.2rem' }} /> {option.label}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button>
        {strings.addField} <Icon type="plus" />
      </Button>
    </Dropdown>
  </div>
);
