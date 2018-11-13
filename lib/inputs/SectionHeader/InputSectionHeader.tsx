import * as React from 'react';
import { IBaseInputProps } from '../IBaseInput';
import { SectionHeader } from "./index";

export interface IProps extends IBaseInputProps<SectionHeader, void> {
}

export class InputSectionHeader extends React.Component<IProps> {

  public render() {
    const { field } = this.props;

    return (
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginBottom: 0 }}>
          {field.header}
        </h2>
        {field.sectionDescription &&
        <p style={{ marginBottom: 0 }}>
          {field.sectionDescription}
        </p>
        }
      </div>
    );
  }
}
