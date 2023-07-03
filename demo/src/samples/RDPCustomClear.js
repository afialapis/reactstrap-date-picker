import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const clearButtonElement = <div id="clear-button-element">Clear</div>;
const RDPCustomClear = () => {
  const inputName = 'reactstrap_date_picker_custom_clear'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Clear button"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {3}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        clearButtonElement   = {clearButtonElement}    
        onClear = {() => {
          const today= new Date()
          setValue(today.toISOString())
        }}   
      /> 
      <FormText>
        {`Custom text/elements can be rendered on Clear button. Current value is ${value}.`}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomClear
