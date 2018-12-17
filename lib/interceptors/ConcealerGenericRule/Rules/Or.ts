import { Rule } from './Rule';

export class Or extends Rule {

  constructor(...rules: Rule[]) {
    super();
    this.type = 'group';
    this.operator = 'or';
    this.rules = rules;
  }
}
