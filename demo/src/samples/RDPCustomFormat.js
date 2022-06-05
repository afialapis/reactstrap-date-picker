import React, { useState } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const RDPCustomFormat = () => {
  const inputName = 'reactstrap_date_picker_custom_format'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Format and Labels"}
      </Label>
      <DatePicker
        name         = {inputName}
        instanceCount= {4}
        value        = {value}
        onChange     = {(v, _f) => setValue(v)}
        dateFormat   = {"DD/MM/YYYY"}
        dayLabels    = {spanishDayLabels}
        monthLabels  = {spanishMonthLabels}
      /> 
      <FormText>
        {"Using ES labels and dateFormat='DD/MM/YYYY'"}        
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomFormat
