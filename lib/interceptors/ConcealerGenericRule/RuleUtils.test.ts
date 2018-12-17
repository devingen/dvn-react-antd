import { Rule } from './Rules/Rule';
import { doesSatisfyRule } from './RuleUtils';

describe('RuleUtils', function () {

  describe('or', function () {

    it('should return true for empty rules', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return true for single rule when rule passes', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'AÜ',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return false for single rule when rule fails', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeFalsy();
    });

    it('should return true for two rules when both of them pass', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }, {
          condition: 'eq',
          key: 'class',
          type: 'condition',
          value: '4',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
        class: 4,
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return true for two rules when one of them passes', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }, {
          condition: 'eq',
          key: 'class',
          type: 'condition',
          value: '4',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
        class: 4,
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });
  });

  describe('and', function () {

    it('should return true for empty rules', function () {

      const rule: Rule = {
        operator: 'and',
        rules: [],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return true for single rule when rule passes', function () {

      const rule: Rule = {
        operator: 'and',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'AÜ',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return false for single "and" rule when rule fails', function () {

      const rule: Rule = {
        operator: 'and',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
      };
      expect(doesSatisfyRule(rule, data)).toBeFalsy();
    });

    it('should return true for two rules when both of them pass', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }, {
          condition: 'eq',
          key: 'class',
          type: 'condition',
          value: '4',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
        class: 4,
      };
      expect(doesSatisfyRule(rule, data)).toBeTruthy();
    });

    it('should return false for two rules when one of them passes', function () {

      const rule: Rule = {
        operator: 'or',
        rules: [{
          condition: 'eq',
          key: 'university',
          type: 'condition',
          value: 'İTÜ',
        }, {
          condition: 'eq',
          key: 'class',
          type: 'condition',
          value: '2',
        }],
        type: 'group',
      };

      const data = {
        university: 'AÜ',
        class: 4,
      };
      expect(doesSatisfyRule(rule, data)).toBeFalsy();
    });
  });
});
