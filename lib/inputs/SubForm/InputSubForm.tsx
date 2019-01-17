import { BaseField, BaseInputProps, SubForm } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';
import { Form } from '../../form/Form';

export interface IProps extends BaseInputProps<SubForm, any> {
}

export class InputSubForm extends React.Component<IProps> {

  public render() {
    const { disabled, field, errors, onChange, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    // add values to the fields
    const fieldsWithValues = field.fields.map(f => ({ ...f, value: (value || {})[f.id] })) as BaseField[];

    return (
      <div>
        <Form
          fields={fieldsWithValues}
          language={field.language}
          layout={field.layout}
          loading={disabled}
          onChange={onChange}
          showFieldOrder={field.showFieldOrder}
        />

        <div className="error" style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
