export class Rule {
  public type: 'condition' | 'group';

  // exists if the type is 'group'
  public rules?: Rule[];
  public operator?: 'and' | 'or';

  // exists if the type is 'operator'
  public condition?: 'eq' | 'ne';
  public key?: string;
  public value?: any;
}
