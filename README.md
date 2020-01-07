![reactstrap-date-picker logo](https://reactstrap-date-picker.afialapis.com/assets/images/logo/reactstrap_date_picker_name.png)

[![NPM Version](https://badge.fury.io/js/reactstrap-date-picker.svg)](https://www.npmjs.com/package/reactstrap-date-picker)
[![Dependency Status](https://david-dm.org/afialapis/reactstrap-date-picker.svg)](https://david-dm.org/afialapis/reactstrap-date-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/reactstrap-date-picker.svg?style=flat)](https://www.npmjs.com/package/reactstrap-date-picker)

A Reactstrap based, zero dependencies, date picker.

Based on [react-bootstrap-date-picker](https://github.com/pushtell/react-bootstrap-date-picker/).

Demo and docs at [reactstrap-date-picker](https://reactstrap-date-picker.afialapis.com/).

# Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Reference](#api-reference)
4. [Deeper customizing](#deeper-customizing)
4. [Inspect this package](#inspect-this-package)


# Installation

`reactstrap-date-picker` is compatible with React 0.14.x, 0.15.x and 0.16.x.

```bash
npm install reactstrap-date-picker
```

# Usage

```js
import React from 'react
import {FormGroup, Label, FormText} from 'reactstrap
var DatePicker = require("reactstrap-date-picker");

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      value: new Date().toISOString()
    }
  }

  handleChange(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    })
  }

  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  }

  render() {
    return (
      <FormGroup>
        <Label>My Date Picker</Label>
        <DatePicker id      = "example-datepicker" 
                    value   = {this.state.value} 
                    onChange= {(v,f) => this.handleChange(v, f)} />
        <FormText>Help</FormText>
      </FormGroup>
    )
  }
}

```


# API Reference

## `<DatePicker />`

`reactstrap-date-picker`'s public component.

### Date properties

#### `value`

ISO date string representing the current value.

  * Optional
  * Type: `string`.
  * Example: `"2016-05-19T12:00:00.000Z"`.

#### `defaultValue`

ISO date string representing the default value. Cannot be set with 'value'.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`

#### `dateFormat`

Date format. Any combination of DD, MM, YYYY and separator.

  * Optional
  * Type: `string`
  * Examples: `"MM/DD/YYYY"`, `"YYYY/MM/DD"`, `"MM-DD-YYYY"`, or `"DD MM YYYY"`

#### `weekStartsOn`

Makes the calendar's week to start on a specified day. 0 = Sunday, 1 = Monday, etc.

  * Optional
  * Type: `number`
  * Example: `4`

#### `minDate`

ISO date string to set the lowest allowable date value.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`

#### `maxDate`

ISO date string to set the highest allowable date value.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`


### Events

#### `onChange`

Change callback function.

  * Optional
  * Type: `function`
  * Callback Arguments:
    * `value` : ISO date string representing the selected value.
      * Type: `String`
      * Example: `"2016-05-19T12:00:00.000Z"`
    * `formattedValue` : String representing the formatted value as defined by the `dateFormat` property.
      * Type: `String`
      * Example: `"05/19/2016"`

#### `onFocus`

Focus callback function.

  * Optional
  * Type: `function`
  * Callback Arguments:
    * `event` : Focus event.
      * Type: `Event`

#### `onBlur`

Blur callback function.

  * Optional
  * Type: `function`
  * Callback Arguments:
    * `event` : Blur event.
      * Type: `Event`

#### `onClear`

Defines what happens when clear button is clicked.

  * Optional
  * Type: `function`


### Customize Form Control
  
Form control is the shown HTML input, and you can customize it.

#### `style`

Style object passed to the Form Control input element.

  * Optional
  * Type: `object`
  * Example: `{width: "100%"}`

#### `className`

Class name passed to the Form Control input element.

  * Optional
  * Type: `string`
  * Example: `example-class`

#### `autoComplete`

`autoComplete` attribute passed to the Form Control input element.

  * Optional
  * Type: `string`
  * Example: `off`

#### `autoFocus`

Whether or not component starts with focus.

  * Optional
  * Type: `bool`
  * Example: `false`

#### `disabled`

Whether or not component is disabled.

  * Optional
  * Type: `bool`
  * Example: `false`

#### `size`

Size of the input

  * Optional
  * Type: `string`
  * Examples: `lg`, `sm`, ...

You can also override it completely and pass your own component:

#### `customControl`

Overwrite the default Form Control component with your own component.

  * Optional
  * Type: `React.Component`
  * Example: `<CustomControl />`


### Clear button

#### `showClearButton`

Toggles the visibility of the clearButton

  * Optional
  * Type: `bool`
  * Default: `false`

#### `clearButtonElement`

Character or component to use for the clear button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `"×"`


### Customize Calendar

You can also customize the popup's Calendar:

#### `previousButtonElement`

Character or component to use for the calendar's previous button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `"<"`

#### `nextButtonElement`

Character or component to use for the calendar's next button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `">"`

#### `cellPadding`

CSS padding value for calendar date cells.

  * Optional
  * Type: `string`
  * Default: `"5px"`

#### `dayLabels`

Array of day names to use in the calendar. Starting on Sunday.

  * Optional
  * Type: `array`
  * Default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

#### `monthLabels`

Array of month names to use in the calendar.

  * Optional
  * Type: `array`
  * Default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`

#### `calendarPlacement`

Overlay placement for the popover calendar.

  * Optional
  * Type: `string` or `function`
  * Default: `"top"`

#### `calendarContainer`

Overlay container for the popover calendar. When placing the date-picker in a scrolling container, set this prop to some ancestor of the scrolling container.

  * Optional
  * Type: A DOM element or a component
  * Example: `document.body`

#### `showTodayButton`

Toggles the visibility of the today-button.

  * Optional
  * Type: `boolean`
  * Default: `false`

#### `todayButtonLabel`

Label for the today-button

  * Optional
  * Type: `string`
  * Default: `"Today"`


# Deeper customizing

You can also customize `reactstrap-date-picker` trough element's `id` or `class` attributes.

`reactstrap-date-picker` renders several elements, all contained within a [reactstrap InputGroup](https://reactstrap.github.io/components/form/).
Such elements will have its unique `id` attribute, plus `reactstrap-date-picker` custom `class` names (prefixed by `rdp-*`).

The rendered DOM structure seems like this:

```html
  <div class="input-group rdp-input-group" id="rdp-input-group-SUFFIX">
    <input class="form-control rdp-form-control" id="props.formControl.id or rdp-form-control-SUFFIX" />
    <div class="rdp-overlay">
      <div>
        <div class="rdp-popover">
          <div class="popover">
            <div class="popover-inner">
              <div class="popover-header">
                <div class="rdp-header">
                  <div class="rdp-header-previous-wrapper"/>
                  <span/>
                  <div class="rdp-header-next-wrapper"/>
                </div>
              </div>
              <div class="popover-body">
                <table class="rdp-calendar">
                </table>
              </div>
            </div>
            <span class="arrow">
          </div>
        </div>
      </div>
    </div>
    <input class="rdp-hidden" id="props.id or rdp-hidden-SUFFIX" />
    <div class="input-group-addon rdp-addon">
      <span class="input-group-text">
    </div>
  </div>
```

This `SUFFIX` is:

  · `props.name`

  · if `props.name` is not passed, then use `props.id`

  · if `props.id` is not passed, then take a global counter of active `reactstrap-date-picker` instances

So, the idea is, depending on your needs:

  · if you don't need handle `id`s at all, `reactstrap-date-picker` will render unique `id` with no problem

  · if you need a basic `id` usage, for example accessing the `reactstrap-date-picker`'s value from the DOM, then 
    you just have to pass `props.id` and get the value from the element with that `id`

  · if you will perform more complex operations, then use `props.name` or `props.id`, and pay attention to the
    previous DOM structure and the `SUFFIX` presences



# Inspect this package

## Demo

```bash

npm run demo

```

And visit [http://localhost:3002](http://localhost:3002) on your browser


## Running Tests

```bash

npm run test

```
