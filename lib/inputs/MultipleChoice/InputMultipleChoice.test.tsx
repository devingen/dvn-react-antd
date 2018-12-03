import { MultipleChoice } from './index';
import { getOptionLabels, getSelectedOptions } from './InputMultipleChoice';

describe('<InputMultipleChoice />', () => {

  describe('getSelectedOptions()', () => {

    const options = [
      new MultipleChoice.Option('Beşiktaş', 'besiktas'),
      new MultipleChoice.Option('Fenerbahçe', 'fenerbahce'),
      new MultipleChoice.Option('Galatasaray', 'galatasaray'),
    ];

    it('should return empty array if there is no value', () => {
      expect(getSelectedOptions(options)).toEqual([]);
    });

    it('should return the label of only the single value', () => {
      expect(getSelectedOptions(options, ['besiktas'])).toEqual([
        new MultipleChoice.Option('Beşiktaş', 'besiktas')
      ]);
    });

    it('should return the label of only the single value', () => {
      expect(getSelectedOptions(options, ['besiktas', 'galatasaray'])).toEqual([
        new MultipleChoice.Option('Beşiktaş', 'besiktas'),
        new MultipleChoice.Option('Galatasaray', 'galatasaray'),
      ]);
    });
  });

  describe('getOptionLabels()', () => {

    const options = [
      new MultipleChoice.Option('Beşiktaş', 'besiktas'),
      new MultipleChoice.Option('Fenerbahçe', 'fenerbahce'),
      new MultipleChoice.Option('Galatasaray', 'galatasaray'),
    ];

    it('should return empty string if there is no value', () => {
      expect(getOptionLabels(options)).toBe('');
    });

    it('should return the label of only the single value', () => {
      expect(getOptionLabels(options, ['besiktas'])).toBe('Beşiktaş');
    });

    it('should return the label of only the single value', () => {
      expect(getOptionLabels(options, ['besiktas', 'galatasaray'])).toBe('Beşiktaş, Galatasaray');
    });
  });
});
