import React, { useImperativeHandle, forwardRef }  from 'react'

import { useCheckProps } from './util/useCheckProps'
import { InputGroup } from './input/InputGroup'
import { InputOverlay } from './input/InputOverlay'
import { InputHidden } from './input/InputHidden'
import { InputClearButton } from './input/InputClearButton'
import { InputControlInput } from './input/InputControlInput'
import { useInputValues } from './input/useInputValues'
import { useInputIds } from './input/useInputIds'
import { useFixedDayLabels } from './input/useDayLabels'
import { Calendar } from './calendar/Calendar'
import { useCalendarProps } from './calendar/useCalendarProps'

import {datePickerProps, datePickerDefaulProps} from './props'

function _DatePicker (props, ref) {

  const {value, defaultValue, dateFormat, weekStartsOn, minDate, maxDate, 
    onChange, onFocus, onBlur, onClear, onInvalid, 
    id, name, required, placeholder, inputRef, noValidate, valid, invalid, 
    customInputGroup, style, className, autoComplete, autoFocus, disabled, size, 
    customControl, showClearButton, clearButtonElement, 
    previousButtonElement, nextButtonElement, pickMonthElement,
    cellPadding, roundedCorners, dayLabels, monthLabels, calendarPlacement, calendarContainer, 
    showWeeks, showTodayButton, todayButtonLabel, children } = props

  const propError= useCheckProps(value, defaultValue)
  if (propError!=undefined) {
    throw new Error(propError)
  }


  const [hiddenInputRef, overlayContainerRef, controlInputRef, open, placement, 
    handleFocus, handleBlur] = useCalendarProps(calendarPlacement, inputRef, autoFocus, onBlur, onFocus)

  const [innerValue, inputValue, displayDate, 
         selectedDate, handleClear, handleInputChange, 
         handleChangeMonth, handleChangeDate] = useInputValues(controlInputRef, value, defaultValue, 
          minDate, maxDate, dateFormat, onClear, onChange)

  const [groupInputId, hiddenInputId, controlInputId] = useInputIds(id, name, customControl)

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return selectedDate ? selectedDate.toISOString() : null;
    },
    getFormattedValue: () => {
      return displayDate ? inputValue : null;
    },
    getNode: () => controlInputRef?.current
  }) /*, [controlInputRef, displayDate, inputValue, selectedDate]*/);
  

  const fixedDayLabels = useFixedDayLabels(dayLabels, weekStartsOn)

  const handleChangeDateAndBlur = (nSelectedDate) => {
    handleChangeDate(nSelectedDate)
    handleBlur(true)
  }
  
  return (
    <InputGroup
      customInputGroup  = {customInputGroup}
      size              = {size}
      inputId           = {groupInputId}>

      <InputControlInput 
        controlId         = {controlInputId}
        customControl     = {customControl}
        value             = {inputValue || ''}
        required          = {required}
        placeholder       = {placeholder || ''}
        inputRef          = {controlInputRef}
        disabled          = {disabled}
        className         = {className}
        style             = {style}
        autoFocus         = {autoFocus}
        autoComplete      = {autoComplete}
        onInvalid         = {onInvalid}
        noValidate        = {noValidate}
        valid             = {valid}
        invalid           = {invalid}
        onFocus           = {() => handleFocus()}
        onBlur            = {(e) => handleBlur(e?.data?.rdp_close_calendar || false) }
        onChange          = {() => handleInputChange()}
      />

      <Calendar
        placement            = {placement}
        open                 = {open}
        container            = {calendarContainer || overlayContainerRef.current}
        target               = {controlInputId}
        previousButtonElement= {previousButtonElement}
        nextButtonElement    = {nextButtonElement}
        pickMonthElement     = {pickMonthElement}
        displayDate          = {displayDate}
        minDate              = {minDate}
        maxDate              = {maxDate}
        onChangeMonth        = {(newDisplayDate) => handleChangeMonth(newDisplayDate)}
        monthLabels          = {monthLabels}
        cellPadding          = {cellPadding}
        selectedDate         = {selectedDate}
        onChange             = {(newSelectedDate) => handleChangeDateAndBlur(newSelectedDate)}
        dayLabels            = {fixedDayLabels}
        weekStartsOn         = {weekStartsOn}
        showTodayButton      = {showTodayButton}
        todayButtonLabel     = {todayButtonLabel}
        roundedCorners       = {roundedCorners}
        showWeeks            = {showWeeks}/>
    
      <InputOverlay  
        overlayContainerRef = {overlayContainerRef}/>

      <InputHidden
        inputId             = {hiddenInputId}
        name                = {name}
        value               = {innerValue || ''}
        formattedValue      = {innerValue ? inputValue : ''}
        hiddenInputRef      = {hiddenInputRef}
        />
      
            
      {(showClearButton && !customControl)
        ? 
        <InputClearButton
          inputValue         = {inputValue}
          disabled           = {disabled}
          clearButtonElement = {clearButtonElement}
          onClick            = {() => handleClear()}
        /> 
        : null         
      }
      
      {children}
  
    </InputGroup>
  )
}

const DatePicker = forwardRef(_DatePicker)

DatePicker.propTypes= datePickerProps

DatePicker.defaultProps= datePickerDefaulProps

export {DatePicker}
