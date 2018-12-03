import { Rate } from 'antd';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { RatingStars } from './index';
import { InputRatingStars } from './InputRatingStars';

configure({ adapter: new Adapter() });

describe('<InputRatingStars />', () => {

  it('should render a Rate with 5 stars', () => {
    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating')}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find(Rate).prop('count')
    ).toBe(5);
  });

  it('should render a Rate with 10 stars', () => {
    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating', '', 10)}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find(Rate).prop('count')
    ).toBe(10);
  });

  it('should render a disabled Rate', () => {
    expect(
      shallow(<InputRatingStars
        disabled={true}
        field={new RatingStars('rating', 'Rating')}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find(Rate).prop('disabled')
    ).toBeTruthy();
  });

  it('should render a disabled Rate for preview', () => {
    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating').showPreview()}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find(Rate).prop('disabled')
    ).toBeTruthy();
  });

  it('should display no error', () => {
    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating')}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find('.error').text()
    ).toBe('');
  });

  it('should display error', () => {
    expect(
      shallow(<InputRatingStars
        errors={['No way!']}
        field={new RatingStars('rating', 'Rating')}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />).find('.error').text()
    ).toBe('No way!');
  });

  it('should render a Rate with value 4 if the field value is 0.8 and there are 5 stars', () => {

    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating')}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        value={0.8}
      />).find(Rate).prop('value')
    ).toBe(4);
  });

  it('should render a Rate with value 8 if the field value is 0.8 and there are 10 stars', () => {

    expect(
      shallow(<InputRatingStars
        field={new RatingStars('rating', 'Rating', '', 10)}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        value={0.8}
      />).find(Rate).prop('value')
    ).toBe(8);
  });

  it('should call onSubmit with 0.8 when there are 5 stars and the selected star is the 4th star', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<InputRatingStars
      field={new RatingStars('rating', 'Rating')}
      onBlur={jest.fn()}
      onChange={onChange}
    />);

    wrapper.find(Rate).simulate('change', 4);

    // onChange should be called once
    expect(onChange.mock.calls).toHaveLength(1);

    // should be called with a single parameter
    expect(onChange.mock.calls[0]).toHaveLength(1);

    // the parameter sent to the onChange must be 0.8
    expect(onChange.mock.calls[0][0]).toBe(0.8);
  });
});
