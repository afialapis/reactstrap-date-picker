import React from 'react'
import {Input} from 'reactstrap'

const InputControlInput = (
  {customControl, controlId, 
    value, required, placeholder, inputRef, disabled, 
  className, style, autoFocus, autoComplete, onInvalid, noValidate,
  onKeyDown, onFocus, onBlur, onChange}) => {


  if (customControl!=undefined) {
    return React.cloneElement(customControl, {
      id          : controlId,
      value       : value || '',
      required    : required,
      placeholder : placeholder,
      ref         : inputRef,
      disabled    : disabled,
      className   : `rdp-form-control ${className || ''} ${customControl.props.className||''}`,
      style       : {...customControl.props.style||{},  ...style || {}},
      autoComplete: autoComplete,
      onInvalid   : onInvalid,
      noValidate  : noValidate,
      onKeyDown   : onKeyDown,
      onFocus     : onFocus,
      onBlur      : onBlur,
      onChange    : onChange
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
      className   = {`rdp-form-control ${className || ''}`}
      style       = {style}
      autoFocus   = {autoFocus}
      autoComplete= {autoComplete}
      onInvalid   = {onInvalid}
      noValidate  = {noValidate}
      onKeyDown   = {onKeyDown}
      onFocus     = {onFocus}
      onBlur      = {onBlur}
      onChange    = {onChange}
      />
  )

}

export {InputControlInput}