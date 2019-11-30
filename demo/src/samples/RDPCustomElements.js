import React, { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const clearButtonElement = <div id="clear-button-element">Clear</div>;
const previousButtonElement = <div id="previous-button-element">Prev</div>;
const nextButtonElement = <div id="next-button-element">Next</div>;

const RDPCustomElements = () => {
  const inputName = 'reactstrap_date_picker_custom_elements'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("06/01/2019")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Elements"}
      </Label>
      <InputGroup>
        <DatePicker
          name         = {inputName}
          instanceCount= {3}
          value        = {value}
          onChange     = {(v, f) => {setValue(v); setFmtValue(f);}}
          clearButtonElement   = {clearButtonElement}
          nextButtonElement    = {nextButtonElement}
          previousButtonElement= {previousButtonElement}           
        /> 
      </InputGroup>
      <FormText>
        {'Custom text/elements can be rendered on Clear and Prev/Next calendar buttons'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomElements
