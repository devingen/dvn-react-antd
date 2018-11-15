import { FormContext } from "../form/FormContext";
import { BaseField } from "../models/BaseField";
import { ModifierNonStandardCharRemoverHandler } from "./ModifierNonStandardCharRemover";

describe('ModifierNonStandardCharRemover', () => {

  it('should remove the emoji', () => {
    expect(
      new ModifierNonStandardCharRemoverHandler().run(new FormContext('en'), {} as BaseField, 'this guy should not be here. 😁 <- yes, this guy')
    ).toEqual({ "value": "this guy should not be here.  <- yes, this guy" })
  })
});
