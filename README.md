# reactstrap-date-picker
[![NPM Version](https://badge.fury.io/js/reactstrap-date-picker.svg)](https://www.npmjs.com/package/reactstrap-date-picker)
[![Dependency Status](https://david-dm.org/afialapis/reactstrap-date-picker.svg)](https://david-dm.org/afialapis/reactstrap-date-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/reactstrap-date-picker.svg?style=flat)](https://www.npmjs.com/package/reactstrap-date-picker)

A Reactstrap based, zero dependencies, date picker.

Based on [react-bootstrap-date-picker](https://github.com/pushtell/react-bootstrap-date-picker/).

Demo and docs at [reactstrap-date-picker](https://reactstrap-date-picker.afialapis.com/).



## Installation

`reactstrap-date-picker` is compatible with React 0.14.x, 0.15.x and 0.16.x.

```bash
npm install reactstrap-date-picker
```

## Usage

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
        <Label>Label</Label>
        <DatePicker id      = "example-datepicker" 
                    value   = {this.state.value} 
                    onChange= {(v,f) => this.handleChange(v, f)} />
        <FormText>Help</FormText>
      </FormGroup>
    )
  }
}

```

## Demo

```bash

npm run demo

```

And visit [http://localhost:3002](http://localhost:3002) on your browser


## Running Tests

```bash

npm run test

```


## API Reference

### `<DatePicker />`

DatePicker component. Renders as a [reactstrap InputGroup](https://reactstrap.github.io/components/form/).

[InputGroup](https://reactstrap.github.io/components/form/) properties are passed through to the input group.

* **Properties:**
  * `value` - ISO date string representing the current value.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2016-05-19T12:00:00.000Z"`
  * `defaultValue` - ISO date string representing the default value. Cannot be set with 'value'.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2016-05-19T12:00:00.000Z"`
  * `minDate` - ISO date string to set the lowest allowable date value.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2016-05-19T12:00:00.000Z"`
  * `maxDate` - ISO date string to set the highest allowable date value.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2016-05-19T12:00:00.000Z"`
  * `style` - Style object passed to the `FormControl` input element.
    * **Optional**
    * **Type:** `object`
    * **Example:** `{width: "100%"}`
  * `className` - Class name passed to the `FormControl` input element.
    * **Optional**
    * **Type:** `string`
    * **Example:** `example-class`
  * `autoComplete` - autoComplete attribute passed to the `FormControl` input element.
    * **Optional**
    * **Type:** `string`
    * **Example:** `off`
  * `autoFocus` - Whether or not component starts with focus.
    * **Optional**
    * **Type:** `bool`
    * **Example:** `false`
  * `disabled` - Whether or not component is disabled.
    * **Optional**
    * **Type:** `bool`
    * **Example:** `false`
  * `onChange` - Focus callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `value` - ISO date string representing the selected value.
        * **Type:** `String`
        * **Example:** `"2016-05-19T12:00:00.000Z"`
      * `formattedValue` - String representing the formatted value as defined by the `dateFormat` property.
        * **Type:** `String`
        * **Example:** `"05/19/2016"`
  * `onFocus` - Focus callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `event` - Focus event.
        * **Type:** `Event`
  * `onBlur` - Blur callback function.
    * **Optional**
    * **Type:** `function`
    * **Callback Arguments:**
      * `event` - Blur event.
        * **Type:** `Event`
  * `dateFormat` - Date format. Any combination of DD, MM, YYYY and separator.
    * **Optional**
    * **Type:** `string`
    * **Examples:** `"MM/DD/YYYY"`, `"YYYY/MM/DD"`, `"MM-DD-YYYY"`, or `"DD MM YYYY"`
  * `clearButtonElement` - Character or component to use for the clear button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `"×"`
  * `showClearButton` - Toggles the visibility of the clearButton
    * **Optional**
    * **Type:** `bool`
    * **Example:** `false`
  * `onClear` - Defines what happens when clear button is clicked.
    * **Optional**
    * **Type:** `function`
  * `previousButtonElement` - Character or component to use for the calendar's previous button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `"<"`
  * `nextButtonElement` - Character or component to use for the calendar's next button.
    * **Optional**
    * **Type:** `string` or `ReactClass`
    * **Example:** `">"`
  * `cellPadding` - CSS padding value for calendar date cells.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2px"`
  * `dayLabels` - Array of day names to use in the calendar. Starting on Sunday.
    * **Optional**
    * **Type:** `array`
    * **Example:** `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`
  * `monthLabels` - Array of month names to use in the calendar.
    * **Optional**
    * **Type:** `array`
    * **Example:** `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`
  * `calendarPlacement` - Overlay placement for the popover calendar.
    * **Optional**
    * **Type:** `string` or `function`
    * **Example:** `"top"`
  * `calendarContainer` - Overlay container for the popover calendar. When placing the date-picker in a scrolling container, set this prop to some ancestor of the scrolling container.
    * **Optional**
    * **Type:** A DOM element or a component
    * **Example:** `document.body`
  * `weekStartsOn` - Makes the calendar's week to start on a specified day. 0 = Sunday, 1 = Monday, etc.
    * **Optional**
    * **Type:** `number`
    * **Example:** `4`
  * `showTodayButton` - Toggles the visibility of the today-button.
    * **Optional**
    * **Type:** `boolean`
    * **Example:** `false`
  * `todayButtonLabel` - Label for the today-button
    * **Optional**
    * **Type:** `string`
    * **Example:** `"Today"`
  * `customControl` - Overwrite the default `FormControl` component with your own component.
    * **Optional**
    * **Type:** `React.Component`
    * **Example:** `<CustomControl />`

