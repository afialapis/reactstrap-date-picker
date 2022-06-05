import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPSizeSmall = () => {
  const inputName = 'reactstrap_date_picker_size-small'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Small"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {7}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        size         = "sm"
      />
      <FormText>
        {"Small size input, size='sm'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPSizeSmall
