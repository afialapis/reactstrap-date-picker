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

const _defaultDateFormat= () => {
  const language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : ''
  const dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
  return dateFormat
}

const DEFAULT_DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DEFAULT_MONTH_LABELS = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December']

const DatePickerBase = (props, ref) => {

  const {
    // Global props
    value, 
    defaultValue, 
    id, 
    name, 
    dateFormat           = _defaultDateFormat(),
    minDate,
    maxDate, 
    clearButtonElement   = '×',
    showClearButton      = true,

    // Event props
    onInvalid,
    onChange,
    onClear,
    onBlur,
    onFocus,
    
    // Input Group props
    size,
    valid, 
    invalid,
    customInputGroup,    
    
    // Input props
    autoComplete = 'on',
    autoFocus = false,
    disabled = false,
    noValidate = false,
    placeholder,
    required,
    className,
    style = undefined /* {
      width: '100%'
    } */,
    inputRef,
    customControl,
    children, 
    
    // Calendar props
    // target,
    calendarContainer, 
    
    dayLabels   = DEFAULT_DAY_LABELS,
    monthLabels = DEFAULT_MONTH_LABELS,
    weekStartsOn,
    showWeeks            = false,
    previousButtonElement= '<',
    nextButtonElement    = '>',
    pickMonthElement     = undefined,
    showTodayButton      = false,
    todayButtonLabel     = 'Today',
    roundedCorners       = false,
    cellPadding          = '5px',
    calendarPlacement    = 'bottom'
  } = props

  const propError= useCheckProps(value, defaultValue)
  if (propError!=undefined) {
    throw new Error(propError)
  }


  const [hiddenInputRef, overlayContainerRef, popoverRef, controlInputRef, open, placement, 
    handleFocus, handleBlur] = useCalendarProps(calendarPlacement, inputRef, autoFocus, onBlur, onFocus)

  const [innerValue, inputValue, displayDate, 
         selectedDate, handleClear, handleInputChange, 
         handleChangeMonth, handleChangeDate, handleBadInputOnBlur] = useInputValues(controlInputRef, value, defaultValue, 
          minDate, maxDate, dateFormat, onClear, onChange)

  const [groupInputId, hiddenInputId, controlInputId, overlayId] = useInputIds(id, name, customControl)

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return selectedDate ? selectedDate.toISOString() : null;
    },
    getFormattedValue: () => {
      return displayDate ? inputValue : null;
    },
    getNode: () => controlInputRef?.current
  })) //, [controlInputRef, displayDate, inputValue, selectedDate]))
  

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
        onBlur            = {(event) => {handleBadInputOnBlur(); handleBlur(event) }}
        onChange          = {() => handleInputChange()}
      />

      <InputOverlay  
        overlayContainerRef = {overlayContainerRef}
        oid                 = {overlayId}>

        {overlayContainerRef.current == undefined
         ? null
         : 

          <Calendar
            popoverRef           = {popoverRef}
            placement            = {placement}
            open                 = {open}
            container            = {calendarContainer || overlayContainerRef}
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
        }
      </InputOverlay>
      
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

const DatePicker = forwardRef(DatePickerBase)

export {DatePicker}
