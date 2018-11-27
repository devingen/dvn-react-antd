# Devingen - Form Implementation with Antd Framework

[![Build Status](https://travis-ci.org/devingen/js-antd.svg?branch=master)](https://travis-ci.org/devingen/js-antd)
[![Coverage Status](https://coveralls.io/repos/github/devingen/js-antd/badge.svg?branch=master)](https://coveralls.io/github/devingen/js-antd?branch=master&service=github)

Devingen is a framework for form generation, validation and submit. This library is Devingen
form implementation for ReactJS with Ant Design.

## Installation

It can be installed with **npm** `npm install dvn-antd` or **yarn** `yarn add dvn-antd`.

## Usage

The form fields can be generated with **JavaScript** classes

```
import { FieldText, Form } from "dvn-antd";

class SimpleForm extends React.Component {

  onSubmit = (data: any): void => {
    console.log(data);
  }

  render() {

    const fields = [];

    const simpleText = new FieldText('simpleText', 'Simple Text');
    simpleText.description = 'Simple text input that can be used for email, first name, last name etc.';
    simpleText.placeholder = 'Simple text placeholder';

    fields.push(simpleText);

    return (
      <Form
        formData={{ fields }}
        onSubmit={this.onSubmit}
        submitButtonLabel="Submit"
      />
    )
  }
}
```

or with **json** configuration

```
import { FieldText, Form } from "dvn-antd";

export class SimpleForm extends React.Component {

  onSubmit = (data: any): void => {
      console.log(data);
  }
  
  render() {

    const fields: any[] = [
      {
        description: 'Simple text input that can be used for email, first name, last name etc.',
        id: 'simpleText',
        placeholder: 'Simple text placeholder',
        title: 'Simple Text',
        type: FieldText.type,
      }
    ];

    return (
      <Form
        formData={{ fields }}
        onSubmit={this.onSubmit}
        submitButtonLabel="Submit"
      />
    )
  }
}
```

 
