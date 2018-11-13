import * as React from "react";
import { registerField } from "../../form/InputGenerator";
import { BaseField, InputGenerator } from "../../models/BaseField";
import { InputSectionHeader } from "./InputSectionHeader";

export class SectionHeader extends BaseField {

  public static type = 'sectionHeader';

  public type = 'sectionHeader';

  public header: string;

  public sectionDescription?: string;

  constructor(id: string, header: string, sectionDescription?: string) {
    super();
    this.id = id;
    this.header = header;
    this.sectionDescription = sectionDescription;
  }
}

const render: InputGenerator  = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputSectionHeader
  disabled={disabled}
  field={field as SectionHeader}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
/>;

// register 'sectionHeader' key for json form generations
registerField('sectionHeader', render);
