import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../rdp'

const RDPPlacementRight = () => {
  const inputName = 'reactstrap_date_picker_placement_right'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Right"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {10}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        calendarPlacement    = "right"
      />
      <FormText>
        {"calendarPlacement='right'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPPlacementRight
