import React from 'react'
import {InputGroupText} from 'reactstrap'

const InputClearButton = ({inputValue, disabled, clearButtonElement, onClick}) => 
  <div className="rdp-addon input-group-append">
    <InputGroupText  
      onClick  = {() => disabled ? null : onClick()}
      style    = {{
                  opacity: (inputValue && !disabled) ? 1 : 0.5,
                  cursor:(inputValue && !disabled) ? 'pointer' : 'not-allowed',
                  width: "100%"
                }}>
      {clearButtonElement}
    </InputGroupText>   
  </div>


export {InputClearButton}