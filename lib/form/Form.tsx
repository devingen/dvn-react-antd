import { Button, LocaleProvider } from 'antd';
import * as cn from 'classnames';
import { DevingenForm, getFirstError, SubmitCallback } from 'dvn-react-core';
import { generateField } from 'dvn-react-core/dist/fields/FieldGenerator';
import { equals, FormProps, generateState, handleExtraButtonClick } from 'dvn-react-core/dist/form/Form';
import { Language } from 'dvn-react-core/dist/form/FormContext';
import * as React from 'react';
import { colors } from '../constants';

import './Form.css';

export class Form extends DevingenForm {

  public constructor(props: FormProps) {
    super(props);
    this.state = generateState(props);
  }

  public componentDidUpdate(previousProps: FormProps) {

    if (equals(this.props, previousProps)) {
      // abort if props are not changed
      return;
    }
    this.setState(generateState(this.props));
  }

  public render() {
    const {
      fields, language, layout, loading, submitButtonLabel, extraButtons, showFieldOrder,
    } = this.props;
    const { errors, values, visibilities } = this.state;

    // retrieve the first error and show at the bottom
    const error = getFirstError(errors);

    // order is used to show the field order numbers if props.showFieldOrder is true
    let order = 0;

    return (
      <LocaleProvider locale={getLocale(language)}>
        <form className={cn({
          'dvn-form': true,
          [layout as string]: true,
        })} onSubmit={(e: any) => this.onFormSubmit(e)}>
          {fields.map(field => {

            if (!visibilities[field.id]) {
              // don't render the field if it is not visible
              return null;
            }

            const input = generateField(field, values[field.id], errors[field.id], loading!, this.onFieldChange, this.onFieldBlur);
            if (field.title && field.title !== '') {
              order += 1;
            }

            return (
              <div
                id={field.id}
                key={field.id}
                className={cn({
                  'dvn-form-field': true,
                  'dvn-row': layout === 'horizontal',
                  required: field.required,
                })}>
                <div className={cn({
                  'dvn-col-sm-6': layout === 'horizontal',
                  'dvn-empty-label': !field.title,
                  'dvn-form-label': true,
                })}>
                  <label htmlFor={field.id}>
                    <b>
                      {showFieldOrder && `${order}. `}
                      {field.title}
                    </b>

                    {(layout === 'vertical' && field.description && field.description !== '') &&
                    <div className="description">
                      {field.description}
                    </div>
                    }
                  </label>
                </div>

                <div className={cn({
                  'dvn-col-sm-18': layout === 'horizontal',
                  'dvn-input-container': true,
                })}>

                  {(layout === 'horizontal' && field.description && field.description !== '') &&
                  <div className="dvn-form-label-right">
                    {field.description}
                  </div>
                  }

                  {input}
                </div>
              </div>
            );
          })}

          <div className="dvn-form-footer">
            {error && <span style={{ color: colors.error, marginRight: '1rem' }}>{error}</span>}

            {extraButtons!.map(button =>
              <Button
                key={button.label}
                type={button.type}
                loading={button.loading}
                onClick={() => this.onExtraButtonClick(button.onClick)}
                style={{ marginRight: '1rem' }}
              >
                {button.label}
              </Button>,
            )}

            {submitButtonLabel &&
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {submitButtonLabel}
            </Button>
            }
          </div>
        </form>
      </LocaleProvider>
    );
  }

  public onExtraButtonClick(callback: SubmitCallback) {

    const state = handleExtraButtonClick(this.props, this.state, callback, true);

    if (state) {
      this.setState(state);
    }
  }
}

export function getLocale(language?: Language): any {
  switch (language) {
    case Language.tr_TR:
      return require('antd/lib/locale-provider/tr_TR');
    case Language.en_US:
    default:
      return require('antd/lib/locale-provider/en_US');
  }
}
