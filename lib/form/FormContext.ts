export class FormContext {
  public language: Language;
  public strings: any;

  constructor(language = Language.en_US) {
    this.language = language;

    let strings: any | undefined;
    try {
      strings = require(`../i18n/${language}`);
    } catch (e) {
      strings = require('../i18n/en_US');
    }

    this.strings = strings.default;
  }
}

export enum Language {
  en_US = 'en_US',
  tr_TR = 'tr_TR',
}


