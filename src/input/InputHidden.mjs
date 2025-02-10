import React from 'react'

const InputHidden = ({inputId, name, value, formattedValue, hiddenInputRef}) =>
  <input 
      ref       = {hiddenInputRef}
      type      = "hidden"
      className = 'rdp-hidden'
      id        = {inputId} 
      name      = {name} 
      value     = {value || ''} 
      data-formattedvalue = {formattedValue}
  />
export  {InputHidden}
