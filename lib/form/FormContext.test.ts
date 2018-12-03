import en_US from '../i18n/en_US';
import tr_TR from '../i18n/tr_TR';
import { FormContext, Language } from './FormContext';

describe('FormContext', () => {

  it('should have default language set if no language is provided', () => {
    expect(new FormContext().language).toBe(Language.en_US);
  });

  it('should have default strings set if no language is provided', () => {
    expect(new FormContext().strings).toEqual(en_US);
  });

  it('should have default strings set if wrong language is provided', () => {
    expect(new FormContext('some_INVALIDLANGUAGE' as Language).strings).toEqual(en_US);
  });

  it('should have English (US) strings when the language is en_US', () => {
    expect(new FormContext(Language.en_US).strings).toEqual(en_US);
  });

  it('should have Turkish strings when the language is tr_TR', () => {
    expect(new FormContext(Language.tr_TR).strings).toEqual(tr_TR);
  });
});
