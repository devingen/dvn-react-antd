import { Rule } from './Rules/Rule';

export function doesSatisfyRule(rule: Rule, data: object = {}): boolean {

  if (!rule) {
    return true;
  }

  if (rule.type === 'group') {

    if (!rule.rules || rule.rules.length === 0) {
      return true;
    }

    for (let i = 0; i < (rule.rules || []).length; i++) {
      const satisfies = doesSatisfyRule(rule.rules![i], data);

      if (satisfies && rule.operator === 'or') {
        // return true if any rule satisfies in 'or'
        return true;
      } else if (!satisfies && rule.operator === 'and') {
        // return false if any rule doesn't satisfy in 'and'
        return false;
      } else if (satisfies && rule.operator === 'and' && i === rule.rules.length - 1) {
        // return true if the last rule satisfies in 'and'
        return true;
      }
    }
  } else if (rule.type === 'condition') {
    const { condition, value, key } = rule;

    if (!condition || !key) {
      // condition is not valid
      return false;
    }

    switch (condition) {
      case 'eq': {
        switch (typeof data[key]) {
          case 'boolean' : {
            // tslint:disable-next-line
            return data[key] == value;
          }
          case 'number' : {
            // tslint:disable-next-line
            return data[key] == value;
          }
          case 'string' : {
            // tslint:disable-next-line
            return (data[key] || '').trim() == (value || '').trim();
          }
        }
        return false;
      }
      case 'ne': {
        switch (typeof data[key]) {
          case 'boolean' : {
            // tslint:disable-next-line
            return data[key] != value;
          }
          case 'number' : {
            // tslint:disable-next-line
            return data[key] != value;
          }
          case 'string' : {
            // tslint:disable-next-line
            return (data[key] || '').trim() != (value || '').trim();
          }
        }
        return false;
      }
    }
  }

  return false;
}
