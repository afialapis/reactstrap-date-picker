import React from 'react'

import {InputGroup as RSInputGroup} from 'reactstrap'

const InputGroup = ({children, customInputGroup, size, inputId, valid, invalid}) => {

  if (customInputGroup != undefined) {
    return (
      React.cloneElement(customInputGroup, {children: children})
    )    
  }

  return (
      <RSInputGroup
        size      = {size}
        id        = {inputId}
        className = {`rdp-input-group ${invalid ? 'is-invalid' : ''} ${valid ? 'is-valid' : ''}`}
      >
        {children}
      </RSInputGroup>
  )
}
    
export {InputGroup}