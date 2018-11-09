import * as React from 'react';
import { IBaseInputProps } from './IBaseInput';
import { BaseField } from "../models/BaseField";
import { FieldTypes } from "../models/FieldTypes";

export class FieldSectionHeader extends BaseField {

  public type: FieldTypes.SectionHeader;

  public header: string;
}

export interface IProps extends IBaseInputProps<FieldSectionHeader, void> {
}

export default class InputSectionHeader extends React.Component<IProps> {

  public render() {
    const { field } = this.props;

    return (
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ marginBottom: 0 }}>
          {field.header}
        </h3>
        {field.description &&
        <p style={{ marginBottom: 0 }}>
          {field.description}
        </p>
        }
      </div>
    );
  }
}
