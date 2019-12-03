import React, { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const RDPPlacementTop = () => {
  const inputName = 'reactstrap_date_picker_placement_top'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Top"}
      </Label>
      <InputGroup>
        <DatePicker
          name         = {inputName}
          instanceCount= {9}
          value        = {value}
          onChange     = {(v, _f) => setValue(v)}
          calendarPlacement    = "top"
        /> 
      </InputGroup>
      <FormText>
        {"calendarPlacement='top'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPPlacementTop
