import { DateInput, render } from './index';

describe('initialisation', () => {

  it('should return date input', () => {
    expect(
      new DateInput('date', 'Date', 'Select date', 'Lets user select a day with month and year.')
        .setDateFormat('DD/MM/YYYY')
    ).toEqual({
      'dateFormat': 'DD/MM/YYYY',
      'description': 'Lets user select a day with month and year.',
      'id': 'date',
      'inputType': 'date',
      'placeholder': 'Select date',
      'render': expect.any(Function),
      'timeFormat': 'HH:mm:ss',
      'title': 'Date',
      'type': 'date'
    });
  });

  it('should return time input', () => {
    expect(
      new DateInput('time', 'Time', 'Select time', 'Lets user select date and time.')
        .setTimeFormat('HH:mm')
        .setInputType('time')
        .setTimePlaceholder('Select time')
    ).toEqual({
        'dateFormat': 'YYYY-MM-DD',
        'description': 'Lets user select date and time.',
        'id': 'time',
        'inputType': 'time',
        'placeholder': 'Select time',
        'render': expect.any(Function),
        'timeFormat': 'HH:mm',
        'timePlaceholder': 'Select time',
        'title': 'Time',
        'type': 'date'
      }
    );
  });

  it('should return date time input', () => {
    expect(
      new DateInput('dateTime', 'Date Time', 'Select date', 'Lets user select date and time.')
        .setInputType('dateTime')
        .setTimePlaceholder('Select time')
    ).toEqual({
      'dateFormat': 'YYYY-MM-DD',
      'description': 'Lets user select date and time.',
      'id': 'dateTime',
      'inputType': 'dateTime',
      'placeholder': 'Select date',
      'render': expect.any(Function),
      'timeFormat': 'HH:mm:ss',
      'timePlaceholder': 'Select time',
      'title': 'Date Time',
      'type': 'date'
    });
  });

  it('should return date time preview', () => {
    expect(
      new DateInput('birthDate', 'Date of Passing', '', '')
        .setDateFormat('DD MMM YYYY - HH:mm')
        .setInputType('dateTime')
        .showPreview()
        .setValue(new Date(1938, 9, 10, 9, 5))
    ).toEqual({
      'dateFormat': 'DD MMM YYYY - HH:mm',
      'description': '',
      'id': 'birthDate',
      'inputType': 'dateTime',
      'placeholder': '',
      'preview': true,
      'render': expect.any(Function),
      'timeFormat': 'HH:mm:ss',
      'title': 'Date of Passing',
      'type': 'date',
      'value': new Date(1938, 9, 10, 9, 5)
    });
  });

});

describe('render', () => {

  const onChange = jest.fn();
  const onFieldBlur = jest.fn();

  const component = render(
    new DateInput('date', 'Date', 'Select date'),
    new Date(1881, 4, 19),
    ['Some error'],
    false,
    onChange,
    onFieldBlur
  );

  it('should not be disabled', () => {
    expect(component.props.disabled).toBe(false);
  });

  it('should have the same error', () => {
    expect(component.props.errors).toEqual(['Some error']);
  });

  it('should have the same field', () => {
    expect(component.props.field).toEqual(new DateInput('date', 'Date', 'Select date'));
  });

  it('should have the same value', () => {
    expect(component.props.value).toEqual(new Date(1881, 4, 19));
  });

  it('should call the provided onFieldBlur', () => {

    component.props.onBlur();

    // should be called once
    expect(onFieldBlur.mock.calls).toHaveLength(1);

    // should get one parameter: field
    expect(onFieldBlur.mock.calls[0]).toHaveLength(1);
    expect(onFieldBlur.mock.calls[0][0]).toEqual(new DateInput('date', 'Date', 'Select date'));
  });

  it('should call the provided onChange', () => {
    component.props.onChange(new Date(1920, 3, 23));

    // should be called once
    expect(onChange.mock.calls).toHaveLength(1);

    // should get two parameters; field, value
    expect(onChange.mock.calls[0]).toHaveLength(2);
    expect(onChange.mock.calls[0][0]).toEqual(new DateInput('date', 'Date', 'Select date'));
    expect(onChange.mock.calls[0][1]).toEqual(new Date(1920, 3, 23));
  });
});

