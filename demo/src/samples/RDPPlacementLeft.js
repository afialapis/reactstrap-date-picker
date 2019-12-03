import React, { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const RDPPlacementLeft = () => {
  const inputName = 'reactstrap_date_picker_placement_left'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Left"}
      </Label>
      <InputGroup>
        <DatePicker
          name         = {inputName}
          instanceCount= {12}
          value        = {value}
          onChange     = {(v, _f) => setValue(v)}
          calendarPlacement    = "left"
        /> 
      </InputGroup>
      <FormText>
        {"calendarPlacement='left'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPPlacementLeft
