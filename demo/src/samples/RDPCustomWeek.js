import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const RDPBasic = () => {
  const inputName = 'reactstrap_date_picker_cweek'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Week starts on Monday"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {5}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        weekStartsOn = {1}
      />
      <FormText>
        {"Week starts on Monday, weekStartsOn=1"}
      </FormText>
    </FormGroup>
  )
}

export default RDPBasic
