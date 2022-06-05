import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPSizeLarge = () => {
  const inputName = 'reactstrap_date_picker_size-large'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Large"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {8}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        size         = "lg"
      />
      <FormText>
        {"Large size input, size='lg'"}
      </FormText>
    </FormGroup>
  )
}

export default RDPSizeLarge
