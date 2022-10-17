import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPCustomPickMonthDefault = () => {
  const inputName = 'reactstrap_date_picker_custom_pick_month_def'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Default pick Month/Year selectors"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {3}
        value        = {value}
        minDate      = "2015-01-01T00:00:00.000Z"
        maxDate      = "2025-12-31T00:00:00.000Z"
        onChange     = {(v, _f) => setValue(v)}
        pickMonthElement= {'default'}           
      /> 
      <FormText>
        {'reactstrap-date-picker provides a default Month/Year picker'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomPickMonthDefault
