import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const RDPPlacementBottom = () => {
  const inputName = 'reactstrap_date_picker_placement_bottom'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Bottom"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {11}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        calendarPlacement    = "bottom"
      /> 
      <FormText>
        {"calendarPlacement='bottom'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPPlacementBottom
