import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const RDPFocusBlur = () => {
  const inputName = 'reactstrap_date_picker_focus'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [focused, setFocused] = useState(false)

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Focus / Blur"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {6}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        onBlur       = {() => setFocused(false)}
        onFocus      = {() => setFocused(true)}
      /> 
      <FormText>
        {`Field is ${focused ? 'focused' : 'blurred'}`}
      </FormText>
    </FormGroup>
  )
}

export default RDPFocusBlur
