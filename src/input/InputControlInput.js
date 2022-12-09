import React from 'react'
import {Input} from 'reactstrap'

const InputControlInput = (
  {customControl, controlId, 
    value, required, placeholder, inputRef, disabled, 
  className, style, autoFocus, autoComplete, valid, invalid, onInvalid, noValidate,
  onKeyDown, onFocus, onBlur, onChange}) => {
  
    const validityClassNames= `${invalid===true ? 'is-invalid' : ''} ${valid===true ? 'is-valid' : ''}`

  if (customControl!=undefined) {
    return React.cloneElement(customControl, {
      id          : controlId,
      value       : value || '',
      required    : required,
      placeholder : placeholder,
      ref         : inputRef,
      disabled    : disabled,
      className   : `rdp-form-control ${className || ''} ${customControl.props.className||''} ${validityClassNames}`,
      style       : {...customControl.props.style||{},  ...style || {}},
      autoComplete: autoComplete,
      onInvalid   : onInvalid,
      noValidate  : noValidate,
      onKeyDown   : onKeyDown,
      onFocus     : onFocus,
      onBlur      : onBlur,
      onChange    : onChange,
      valid       : valid,
      invalid     : invalid
    })
  }

  return (
    <Input
      id          = {controlId}
      name        = {controlId}
      value       = {value || ''}
      required    = {required}
      placeholder = {placeholder}
      innerRef    = {inputRef}
      disabled    = {disabled}
      type        = "text"
      className   = {`rdp-form-control ${className || ''} ${validityClassNames}`}
      style       = {style}
      autoFocus   = {autoFocus}
      autoComplete= {autoComplete}
      onInvalid   = {onInvalid}
      noValidate  = {noValidate}
      onKeyDown   = {onKeyDown}
      onFocus     = {onFocus}
      onBlur      = {onBlur}
      onChange    = {onChange}
      valid       = {valid}
      invalid     = {invalid}
      />
  )

}

export {InputControlInput}