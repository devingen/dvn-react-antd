import { FormContext } from "../form/FormContext";
import { BaseField } from "../models/BaseField";
import { ModifierUppercaseConverterHandler } from "./ModifierUppercaseConverter";

describe('ModifierUppercaseConverter', () => {

  it('should uppercase the given value', () => {
    expect(
      new ModifierUppercaseConverterHandler().run(new FormContext('en'), {} as BaseField, 'AsDf')
    ).toEqual({ "value": "ASDF" })
  })
});
