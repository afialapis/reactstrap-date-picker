import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPCustomFormControl = () => {
  const inputName = 'reactstrap_date_picker_custom_form_control'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("06/01/2019")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Form Control"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {1}
        value        = {value}
        onChange     = {(v, f) => {setValue(v); setFmtValue(f);}}
        
        customControl={
          <input className="form-control cusom-form-control" style={{border: '5px solid aliceblue', borderRadius: '10px'}}>
          </input>
        } 
      />
      <FormText>
        {value 
         ? `Selected date is: ${value} (formatted: ${fmtValue})`
         : 'No date selected'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomFormControl
