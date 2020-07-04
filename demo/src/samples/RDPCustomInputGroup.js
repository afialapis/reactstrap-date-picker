import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const CustomInputGroup = ({children}) =>
  <div className="input-group cusom_input_group" style={{border: '5px solid aliceblue', borderRadius: '10px'}}>
    {children}
  </div>

const RDPCustomInputGroup = () => {
  const inputName = 'reactstrap_date_picker_custom_input_group'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("06/01/2019")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Input Group"}
      </Label>
      <DatePicker
       id="xxx"
        name         = {inputName}
        instanceCount= {1}
        value        = {value}
        onChange     = {(v, f) => {setValue(v); setFmtValue(f);}}
        customInputGroup = {<CustomInputGroup/>}
      />
      <FormText>
        {value 
         ? `Selected date is: ${value} (formatted: ${fmtValue})`
         : 'No date selected'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomInputGroup
