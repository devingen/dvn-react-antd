import { FormContext } from "../form/FormContext";
import { BaseField } from "../models/BaseField";
import { ValidatorEmailHandler } from "./ValidatorEmail";

describe('ValidatorEmail', () => {

  it('should return error for invalid email', () => {
    expect(
      new ValidatorEmailHandler().run(new FormContext('en'), { title: 'Email' } as BaseField, 'ata')
    ).toEqual({"error": "Email is not a valid email.", "value": "ata"})
  })

  it('should not return error for valid email', () => {
    expect(
      new ValidatorEmailHandler().run(new FormContext('en'), { title: 'Email' } as BaseField, 'ata@tu.rk')
    ).toEqual({"value": "ata@tu.rk"})
  })
});
