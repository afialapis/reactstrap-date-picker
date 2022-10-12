import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPValidityInvalid = () => {
  const inputName = 'reactstrap_date_picker_valid'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("06/01/2019")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Valid"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {16}
        value        = {value}
        onChange     = {(v, f) => {setValue(v); setFmtValue(f);}}
        invalid      = {true}
      /> 
      <FormText>
        {value 
         ? `Selected date is: ${value} (formatted: ${fmtValue})`
         : 'No date selected'}
      </FormText>
    </FormGroup>
  )
}

export default RDPValidityInvalid
