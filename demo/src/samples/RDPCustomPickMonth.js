import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const pickMonthElement = ({displayDate, minDate, maxDate, onChangeMonth, onChangeYear}) => {
  return (
    <div>
      HEY
    </div>
  )
}

const RDPCustomPickMonth = () => {
  const inputName = 'reactstrap_date_picker_custom_elements'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom pick Month/Year buttons"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {3}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        pickMonthElement= {pickMonthElement}           
      /> 
      <FormText>
        {'Custom elements can be used as Month/Year picker'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomPickMonth
