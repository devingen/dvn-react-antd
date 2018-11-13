import { BaseField } from "../../models/BaseField";
import { ModifierLowercaseConverter } from "./ModifierLowercaseConverter";
import { FormContext } from "../../form/FormContext";
import { InterceptorConfig } from "../index";

describe('ModifierLowercaseConverter', () => {

  it('should lowercase the given value', () => {
    expect(
      new ModifierLowercaseConverter(new BaseField(), new InterceptorConfig())
        .run(new FormContext('en'), 'AsDf')
    ).toEqual({"value": "asdf"})
  })
});
