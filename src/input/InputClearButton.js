import React from 'react'
import {InputGroupText} from 'reactstrap'

const InputClearButton = ({inputValue, disabled, clearButtonElement, onClick}) => 
  <InputGroupText  
    onClick  = {() => disabled ? null : onClick()}
    style    = {{
                opacity: (inputValue && !disabled) ? 1 : 0.5,
                cursor:(inputValue && !disabled) ? 'pointer' : 'not-allowed'
              }}
    className= 'rdp-addon'>
    {clearButtonElement}
  </InputGroupText>   


export {InputClearButton}