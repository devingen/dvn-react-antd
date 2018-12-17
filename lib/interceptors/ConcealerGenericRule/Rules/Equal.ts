import { Rule } from './Rule';

export class Equal extends Rule {

  constructor(key: string, value: any) {
    super();
    this.type = 'condition';
    this.condition = 'eq';
    this.key = key;
    this.value = value;
  }
}
