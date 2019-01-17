import { DatePicker, TimePicker } from 'antd';
import { DateInput } from 'dvn-react-core';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as moment from 'moment';
import * as React from 'react';
import { InputDate } from './InputDate';

configure({ adapter: new Adapter() });

describe('preview', () => {

  it('should render preview with default date format', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .showPreview() as DateInput;

    const wrapper = shallow(<InputDate
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1881, 4, 19)}
    />);
    expect(wrapper.text()).toBe('1881-05-19');
  });

  it('should render preview with given date format', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('DD MMM YYYY - HH:mm')
      .showPreview()  as DateInput;

    const wrapper = shallow(<InputDate
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.text()).toBe('10 Oct 1938 - 09:05');
  });

  it('should render error in preview', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('DD MMM YYYY - HH:mm')
      .showPreview() as DateInput;

    const wrapper = shallow(<InputDate
      errors={['Mourning date']}
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.find('div').at(1).text()).toBe('Mourning date');
  });
});

describe('input', () => {

  it('should render DatePicker if the input type is date', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('DD MMM YYYY')
      .setInputType('date') as DateInput;

    const wrapper = shallow(<InputDate
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(0);
  });

  it('should render TimePicker if the input type is time', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('HH:mm')
      .setInputType('time') as DateInput;

    const wrapper = shallow(<InputDate
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.find(DatePicker)).toHaveLength(0);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
  });

  it('should render DatePicker and TimePicker if the input type is dateTime', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('DD MMM YYYY - HH:mm')
      .setInputType('dateTime') as DateInput;

    const wrapper = shallow(<InputDate
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.find(DatePicker)).toHaveLength(1);
    expect(wrapper.find(TimePicker)).toHaveLength(1);
  });

  it('should call onChange with correct parameters when DatePicker.onChange is called', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<InputDate
      field={new DateInput('birthDate', 'Birth Date', '', '').setInputType('dateTime') as DateInput}
      onBlur={jest.fn()}
      onChange={onChange}
    />);

    wrapper.find(DatePicker).simulate('change', moment(new Date(1920, 3, 23)));

    // should be called once
    expect(onChange.mock.calls).toHaveLength(1);

    // should get two parameters; value
    expect(onChange.mock.calls[0]).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toEqual(new Date(1920, 3, 23));
  });

  it('should call onChange with correct parameters when TimePicker.onChange is called', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<InputDate
      field={new DateInput('birthDate', 'Birth Date', '', '').setInputType('dateTime') as DateInput}
      onBlur={jest.fn()}
      onChange={onChange}
    />);

    wrapper.find(TimePicker).simulate('change', moment(new Date(1938, 9, 10, 9, 5)));

    // should be called once
    expect(onChange.mock.calls).toHaveLength(1);

    // should get two parameters; value
    expect(onChange.mock.calls[0]).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toEqual(new Date(1938, 9, 10, 9, 5));
  });

  it('should render error', () => {

    const field = new DateInput('birthDate', 'Birth Date', '', '')
      .setDateFormat('DD MMM YYYY - HH:mm') as DateInput;

    const wrapper = shallow(<InputDate
      errors={['Mourning date']}
      field={field}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      value={new Date(1938, 9, 10, 9, 5)}
    />);

    expect(wrapper.find('div').at(1).text()).toBe('Mourning date');
  });
});
