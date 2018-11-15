import { FormContext } from "../form/FormContext";
import { BaseField } from "../models/BaseField";
import { ModifierLowercaseConverterHandler } from "./ModifierLowercaseConverter";

describe('ModifierLowercaseConverter', () => {

  it('should lowercase the given value', () => {
    expect(
      new ModifierLowercaseConverterHandler().run(new FormContext('en'), {} as BaseField, 'AsDf')
    ).toEqual({ "value": "asdf" })
  })
});
