import { MultipleChoice } from './index';
import { getSelectedOptionLabels } from './InputMultipleChoice';

describe('<InputMultipleChoice />', () => {

  describe('getSelectedOptionLabels()', () => {

    const options = [
      new MultipleChoice.Option('Beşiktaş', 'besiktas'),
      new MultipleChoice.Option('Fenerbahçe', 'fenerbahce'),
      new MultipleChoice.Option('Galatasaray', 'galatasaray'),
    ];

    it('should return empty string if there is no value', () => {
      expect(getSelectedOptionLabels(options)).toBe('');
    });

    it('should return the label of only the single value', () => {
      expect(getSelectedOptionLabels(options, ['besiktas'])).toBe('Beşiktaş');
    });

    it('should return the label of only the single value', () => {
      expect(getSelectedOptionLabels(options, ['besiktas', 'galatasaray'])).toBe('Beşiktaş, Galatasaray');
    });
  });
});
