import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const previousButtonElement = <div id="previous-button-element">Prev</div>;
const nextButtonElement = <div id="next-button-element">Next</div>;

const RDPCustomElements = () => {
  const inputName = 'reactstrap_date_picker_custom_prev_next'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Prev/Next buttons"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {3}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        nextButtonElement    = {nextButtonElement}
        previousButtonElement= {previousButtonElement}           
      /> 
      <FormText>
        {'Custom text/elements can be rendered on Prev/Next calendar buttons'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomElements
