![reactstrap-date-picker logo](https://reactstrap-date-picker.afialapis.com/assets/images/logo/reactstrap_date_picker_name.png)

[![NPM Version](https://badge.fury.io/js/reactstrap-date-picker.svg)](https://www.npmjs.com/package/reactstrap-date-picker)
[![Dependency Status](https://david-dm.org/afialapis/reactstrap-date-picker.svg)](https://david-dm.org/afialapis/reactstrap-date-picker)
[![NPM Downloads](https://img.shields.io/npm/dm/reactstrap-date-picker.svg?style=flat)](https://www.npmjs.com/package/reactstrap-date-picker)

A Reactstrap based, zero dependencies, date picker.

Demo and docs at [reactstrap-date-picker](https://reactstrap-date-picker.afialapis.com/).


# Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Reference](#api-reference)
4. [Deeper customizing](#deeper-customizing)
5. [Inspect this package](#inspect-this-package)
6. [Changelog](#changelog)


# Installation

Using `npm`:

```bash
npm install reactstrap-date-picker
```

`reactstrap-date-picker` works with these [peer dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/):
  - [React](https://github.com/facebook/react) >= 16.13.1
  - [Reactstrap](https://github.com/reactstrap/reactstrap) >= 8.5.1
    * [Bootstrap](https://github.com/twbs/bootstrap) >= 4.5.2

Check [Changelog](#changelog) for more info on other versions.


# Usage

```js
import React, {useState, useEffect} from 'react
import {FormGroup, Label, FormText} from 'reactstrap'
import {DatePicker} from 'reactstrap-date-picker'

const App = () => {
  const [value, setValue]= useState(new Date().toISOString())
  const [fmtValue, setFmtValue]= useState(undefined)

  handleChange(value, formattedValue) {
    setValue(value)
    setFmtValue(formattedValue)
  }

  useEffect(( )=> {
    console.log(`Formatted value is ${fmtValue}`)
  }, [fmtValue])

  return (
    <FormGroup>
      <Label>My Date Picker</Label>
      <DatePicker id      = "example-datepicker" 
                  value   = {value} 
                  onChange= {(v,f) => handleChange(v, f)} />
      <FormText>Help</FormText>
    </FormGroup>
  )
}

```


# API Reference

## `<DatePicker />`

`reactstrap-date-picker`'s public component.

```js
import {DatePicker} from 'reactstrap-date-picker'

const Example = () => {
  ...
  return (
    ...
      <DatePicker {props} />
    ...
  )
}

```


## Global properties

<details>
<summary>
<code>value, defaultValue, id, name, dateFormat, minDate, maxDate, showClearButton, clearButtonElement</code>
</summary>
<p>

### `value`

ISO date string representing the current value. Cannot be set alongside `defaultValue`.

  * Optional
  * Type: `string`.
  * Example: `"2016-05-19T12:00:00.000Z"`

### `defaultValue`

ISO date string representing the default value. Cannot be set alongside `value`.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`

### `id`

HTML identifier for the `reactstrap-date-picker`'s input (the hidden one). You may
want to use it in case you need to traverse somehow the DOM.

  * Optional
  * Type: `string`.
  * Example: `"example-datepicker"`

### `name`

HTML `name` attribute for the `reactstrap-date-picker`'s input (the hidden one). You may
need to use it depending on how your handle your Forms.

  * Optional
  * Type: `string`.
  * Example: `"date-field"`

### `dateFormat`

Date format. Any combination of DD, MM, YYYY and separator.

  * Optional
  * Type: `string`
  * Examples: `"MM/DD/YYYY"`, `"YYYY/MM/DD"`, `"MM-DD-YYYY"`, or `"DD MM YYYY"`

### `minDate`

ISO date string to set the lowest allowable date value.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`

### `maxDate`

ISO date string to set the highest allowable date value.

  * Optional
  * Type: `string`
  * Example: `"2016-05-19T12:00:00.000Z"`

### `showClearButton`

Toggles the visibility of the clearButton

  * Optional
  * Type: `bool`
  * Default: `false`

### `clearButtonElement`

Character or component to use for the clear button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `"×"`
</p>
</details>


## Input properties
<details>
<summary>
<code>autoComplete, autoFocus, disabled, noValidate, placeholder, required, className, style, inputRef, customControl, children</code>
</summary>
<p>

### `autoComplete`

Hint for form autofill feature.

  * Optional
  * Type: `string`
  * Default: `on`

### `autoFocus`

Whether or not component starts with focus.

  * Optional
  * Type: `bool`
  * Default: `false`

### `disabled`

Whether or not component is disabled.

  * Optional
  * Type: `bool`
  * Default: `false`

### `noValidate`

When present, it specifies that the form-data (input) should not be validated when submitted.

  * Optional
  * Type: `bool`
  * Default: `false`

### `placeholder`

Text that appears in the form control when it has no value set.

  * Optional
  * Type: `text`
  * Example: `John Doe`

### `required`

`boolean`. A value is required or must be check for the form to be submittable

  * Optional
  * Type: `boolean`
  * Default: `false`

### `className`

Class name passed to the Form Control input element.

  * Optional
  * Type: `string`
  * Example: `example-class`

### `style`

Style object passed to the Form Control input element.

  * Optional
  * Type: `object`
  * Example: `{width: "100%"}`

### `inputRef`

A React ref to the Form Control input element

  * Optional
  * Type: `ref`

### `customControl`

Overwrite the default Form Control component with your own component.

  * Optional
  * Type: `React.Component`
  * Example: `<CustomControl />`

### `children`

`children` elements from the Form Control`

  * Optional
  * Type: `React.Component`
</p>
</details>


## Input Group properties

<details>
<summary>
<code>size, valid, invalid, customInputGroup</code>
</summary>
<p>

### `size`

Size of the input

  * Optional
  * Type: `string`
  * Examples: `lg`, `sm`, ...

You can also override it completely and pass your own component:

### `valid`

Applies the `is-valid` class when `true`, does nothing when `false`

  * Optional
  * Type: `bool`
  * Example: `true`

### `invalid`

Applies the `is-invalid` class when `true`, does nothing when `false`

  * Optional
  * Type: `bool`
  * Example: `true`  

### `customInputGroup`

Overwrite the default InputGroup component with your own component.

  * Optional
  * Type: `React.Component`
  * Example: `<CustomInputGroup />`
</p>
</details>

## Calendar properties

<details>
<summary>
<code>dayLabels, monthLabels, weekStartsOn, showWeeks, pickMonthElement, previousButtonElement, nextButtonElement, showTodayButton, todayButtonLabel, cellPadding, roundedCorners, calendarPlacement, calendarContainer</code>
</summary>
<p>

### `dayLabels`

Array of day names to use in the calendar. Starting on Sunday.

  * Optional
  * Type: `array`
  * Default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

### `monthLabels`

Array of month names to use in the calendar.

  * Optional
  * Type: `array`
  * Default: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`

### `weekStartsOn`

Makes the calendar's week to start on a specified day. 0 = Sunday, 1 = Monday, etc.

  * Optional
  * Type: `number`
  * Example: `4`

### `showWeeks`

Shows the number of the week in the calendar

  * Optional
  * Type: `bool`
  * Default: `false`

### `pickMonthElement`

Optional component to use for the calendar's year and month pickers.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `undefined`

`pickMonthElement = undefined` is the same as `pickMonthElement = "none"`.

#### custom pickMonthElement

You can pass a custom `React` component, which will receive these properties:
- `displayDate`
- `minDate`
- `maxDate`
- `onChangeMonth`: a callback receiving an `int` parameter (month number)
- `onChangeYear`: a callback receiving an `int` parameter (year number)

On the [demo](https://github.com/afialapis/reactstrap-date-picker/blob/master/demo/src/samples/RDPCustomPickMonth.js)
you will find a simple custom element.


#### `default` pickMonthElement

There is a predefined component, consisting of two simple `select` elements,
which can be used by passing `pickMonthElement = "default"`.

It has a simple styling, which may not fit your needs. Maybe you can tweak it
through the `css` classes used by `reactstrap-date-picker`:

```html
  <div class="rdp-header">
    <div class="rdp-header-previous-wrapper"/>
    <div class="rdp-header-pick-month-wrapper">
      <!-- if pickMonthElement = 'default' -->
      <div class="rdp-header-pick-month-default">
        <div class="rdp-header-pick-month-default-month"/>
        <div class="rdp-header-pick-month-default-year"/>
      </div>
    </div>
    <div class="rdp-header-next-wrapper"/>
  </div>
```


### `previousButtonElement`

Character or component to use for the calendar's previous button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `"<"`

### `nextButtonElement`

Character or component to use for the calendar's next button.

  * Optional
  * Type: `string` or `ReactClass`
  * Default: `">"`

### `showTodayButton`

Toggles the visibility of the today-button.

  * Optional
  * Type: `boolean`
  * Default: `false`

### `todayButtonLabel`

Label for the today-button

  * Optional
  * Type: `string`
  * Default: `"Today"`

### `cellPadding`

CSS padding value for calendar date cells.

  * Optional
  * Type: `string`
  * Default: `"5px"`

### `roundedCorners`

CSS border-radius value for calendar date cells.

  * Optional
  * Type: `bool`
  * Default: `false`

### `calendarPlacement`

Overlay placement for the popover calendar.

  * Optional
  * Type: `string` or `function`
  * Default: `"top"`

### `calendarContainer`

Overlay container for the popover calendar. When placing the date-picker in a scrolling container, set this prop to some ancestor of the scrolling container.

  * Optional
  * Type: A DOM element or a component
  * Example: `document.body`
</p>
</details>


## Event properties
<details>
<summary>
<code>onChange, onClear, onFocus, onBlur, onInvalid</code>
</summary>
<p>

### `onChange`

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

### `onClear`

Defines what happens when clear button is clicked.

  * Optional
  * Type: `function`

### `onFocus`

Focus callback function.

  * Optional
  * Type: `function`
  * Callback Arguments:
    * `event` : Focus event.
      * Type: `Event`

### `onBlur`

Blur callback function.

  * Optional
  * Type: `function`
  * Callback Arguments:
    * `event` : Blur event.
      * Type: `Event`

### `onInvalid`

Defines what happens when input has not passed the form validation.

  * Optional
  * Type: `function`
</p>
</details>


# Deeper customizing

<details>
<summary>
Customize styling directly trough CSS.
</summary>
<p>

You can also customize `reactstrap-date-picker` using `CSS`, trough element's `id` or `class` attributes.

`reactstrap-date-picker` renders several elements, all contained within a [reactstrap InputGroup](https://reactstrap.github.io/?path=/docs/components-inputgroup--input-group).
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
                  <div class="rdp-header-pick-month-wrapper">
                    <!-- if pickMonthElement = 'default' -->
                    <div class="rdp-header-pick-month-default">
                      <div class="rdp-header-pick-month-default-month"/>
                      <div class="rdp-header-pick-month-default-year"/>
                    </div>
                  </div>
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
    <div class="input-group-text rdp-addon">
    </div>
  </div>
```

This `SUFFIX` is:

- `props.name`

- if `props.name` is not passed, then use `props.id`

- if `props.id` is not passed, then take a global counter of active `reactstrap-date-picker` instances

So, the idea is, depending on your needs:

- if you don't need handle `id`s at all, `reactstrap-date-picker` will render unique `id` with no problem

- if you need a basic `id` usage, for example accessing the `reactstrap-date-picker`'s value from the DOM, then 
  you just have to pass `props.id` and get the value from the element with that `id`

- if you will perform more complex operations, then use `props.name` or `props.id`, and pay attention to the
  previous DOM structure and the `SUFFIX` presences
</p>
</details>


# Inspect this package

## Demo

```bash

npm run demo

```

And visit [http://localhost:3010](http://localhost:3010) on your browser


## Running Tests

```bash

npm run test

```

# Changelog

Originally based on [react-bootstrap-date-picker](https://github.com/pushtell/react-bootstrap-date-picker/),
`reactstrap-date-picker` has evolved. From v1.0 it has been refactored, using React hooks, 
with cleaner code and an improved final performance.

<details>
<summary>
Expand
</summary>
<p>

## 1.0.6

- cleaner readme

## 1.0.5

- fix valid props on hidden input

## 1.0.4

- fix warning on `prop-types`

## 1.0.3

- Added [pickMonthElement](https://github.com/afialapis/reactstrap-date-picker/issues/22)

## 1.0.2

- Fixed [issue #20: In/valid props doesn't apply the reactstrap in/valid css style](https://github.com/afialapis/reactstrap-date-picker/issues/20)

## 1.0.1

- Fixed [issue #19: ReferenceError: Element is not defined](https://github.com/afialapis/reactstrap-date-picker/issues/19)

## 1.0.0

- Introduction of React Hooks

- Deep refactor of the source code

- Supported versions:
· React >= 16.13.1
· Reactstrap >= 8.5.1
· Bootstrap >= 4.5.2

- Improved performance

- Smaller bundle sizes


## 0.0.16

· Version to use if you wanna go Reactstrap 9

· Supported versions:
- React >= 14
- Reactstrap 9.0.1
- Bootstrap 5.1.3

## 0.0.12

· Fixed [issue #15: placeholder will not fallback to dateFormat](https://github.com/afialapis/reactstrap-date-picker/issues/15)

· Fixed [issue #16. do not allow keyboard input of dates out of minDate/maxDate](https://github.com/afialapis/reactstrap-date-picker/issues/16)

· Supported versions:
- React >= 14
- Reactstrap 8.5.1
- Bootstrap 4.5.2

</p>
</details>
