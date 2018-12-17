import { Rule } from './Rule';

export class NotEqual extends Rule {

  constructor(key: string, value: any) {
    super();
    this.type = 'condition';
    this.condition = 'ne';
    this.key = key;
    this.value = value;
  }
}
