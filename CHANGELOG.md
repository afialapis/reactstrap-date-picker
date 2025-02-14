
# Changelog

Originally based on [react-bootstrap-date-picker](https://github.com/pushtell/react-bootstrap-date-picker/),
`reactstrap-date-picker` has evolved. From v1.0 it has been refactored, using `react` hooks, 
with cleaner code and an improved final performance.

## 2.0.0-beta.2

 * Upgraded `xeira`

## 2.0.0-beta.1

 * Upgraded versions to:
    - `react@^18.3.1`
    - `reactstrap@^9.2.3`
    - `bootstrap@^5.3.3`
 * Now using [`xeira`](https://github.com/afialapis/xeira) for bundling. Forced to rewrite tests using ``react` Testing Library`.
 * Removed `prop-types` usages. Also patched some `reactstrap` warning about it.
 * Removed `defaultProps` usages. Also patched some `reactstrap` warning about it.

## 1.0.11

 * fixed `calendarContainer` prop causes calendar to close unexpectedly

## 1.0.10

 * fixed `onClear` event: if passed, `onChange` is not fired

## 1.0.9

 * fixed blur handle when navigating months 

## 1.0.8

 * fixed `inputRef` property to make it work properly when passing callback refs
 * keep Calendar open when clicking inside the control input
 * improve bad format handling on blur

## 1.0.6

 * cleaner readme

## 1.0.5

 * fix valid props on hidden input

## 1.0.4

 * fix warning on `prop-types`

## 1.0.3

 * Added [pickMonthElement](https://github.com/afialapis/reactstrap-date-picker/issues/22)

## 1.0.2

 * Fixed [issue #20: In/valid props doesn't apply the reactstrap in/valid css style](https://github.com/afialapis/reactstrap-date-picker/issues/20)

## 1.0.1

 * Fixed [issue #19: ReferenceError: Element is not defined](https://github.com/afialapis/reactstrap-date-picker/issues/19)

## 1.0.0

 * Introduction of `react` Hooks
 * Deep refactor of the source code
 * Supported versions:
    - `react` >= 16.13.1
    - `reactstrap` >= 8.5.1
    - `bootstrap` >= 4.5.2
 * Improved performance
 * Smaller bundle sizes

## 0.0.16

 * Version to use if you wanna go `reactstrap` 9
 * Supported versions:
    - `react` >= 14
    - `reactstrap` 9.0.1
    - `bootstrap` 5.1.3

## 0.0.12

 * Fixed [issue #15: placeholder will not fallback to dateFormat](https://github.com/afialapis/reactstrap-date-picker/issues/15)
 * Fixed [issue #16. do not allow keyboard input of dates out of minDate/maxDate](https://github.com/afialapis/reactstrap-date-picker/issues/16)
 * Supported versions:
    - `react` >= 14
    - `reactstrap` 8.5.1
    - `bootstrap` 4.5.2
