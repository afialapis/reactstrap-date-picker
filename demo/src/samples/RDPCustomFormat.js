import React, { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  FormText,
  Label
} from 'reactstrap'
import DatePicker from '../../../src'

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const RDPCustomFormat = () => {
  const inputName = 'reactstrap_date_picker_custom_format'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("01/06/2019")

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Custom Format and Labels"}
      </Label>
      <InputGroup>
        <DatePicker
          name         = {inputName}
          instanceCount= {4}
          value        = {value}
          onChange     = {(v, f) => {setValue(v); setFmtValue(f);}}
          dateFormat   = {"DD/MM/YYYY"}
          dayLabels    = {spanishDayLabels}
          monthLabels  = {spanishMonthLabels}
        /> 
      </InputGroup>
      <FormText>
        {"Using ES labels and date format (DD/M/YYYY)"}        
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomFormat
