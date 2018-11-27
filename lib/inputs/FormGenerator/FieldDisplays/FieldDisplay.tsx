import { Icon } from 'antd';
import * as cn from 'classnames';
import * as React from 'react';
import { generateInput } from '../../InputGenerator';

export interface IProps {
  field: any
  order?: number
  layout: 'horizontal' | 'vertical'

  onUpClick?: (id: string) => void
  onDownClick?: (id: string) => void
  onEditClick?: (id: string) => void
  onDeleteClick?: (id: string) => void

  isPending: boolean
  showControls: boolean
}

class FieldDisplay extends React.Component<IProps> {

  public render() {
    const { field, layout, order, showControls, isPending } = this.props;

    const iconStyle = {
      cursor: !isPending ? 'pointer' : 'inherit',
      opacity: isPending ? 0.5 : 1,
    };

    /* tslint:disable:no-empty */
    const input = generateInput(field, undefined, [], isPending,
      () => {
      }, () => {
      });

    return (
      <div id={'fieldDisplay.' + field.id} className="field-display">

        {showControls &&
        <div className="controls">
          <div id={'control.up'} style={iconStyle}>
            <Icon
              type="up"
              onClick={() => !isPending && this.props.onUpClick!(field.id)}
            />
          </div>
          <div id={'control.down'} style={iconStyle}>
            <Icon
              type="down"
              onClick={() => !isPending && this.props.onDownClick!(field.id)}
            />
          </div>
          <div id={'control.delete'} style={iconStyle}>
            <Icon
              type="delete"
              onClick={() => !isPending && this.props.onDeleteClick!(field.id)}
            />
          </div>
          <div id={'control.edit'} style={iconStyle}>
            <Icon
              type="edit"
              onClick={() => !isPending && this.props.onEditClick!(field.id)}
            />
          </div>
        </div>
        }

        <div
          style={{
            padding: '0.5rem 0 0 0',
          }}
        >
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
                  {order && `${order}. `}
                  {field.title}
                </b>

                {(layout === 'vertical' && field.description && field.description !== '') &&
                <div>
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
        </div>
      </div>
    );
  }

}

export default FieldDisplay;
