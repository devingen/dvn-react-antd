import { Rule } from './Rule';

export class And extends Rule {

  constructor(...rules: Rule[]) {
    super();
    this.type = 'group';
    this.operator = 'and';
    this.rules = rules;
  }
}
