import React, { useState, useRef } from 'react'
import {
  FormGroup,
  FormText,
  Label
} from 'reactstrap'
import {DatePicker} from '../rdp'

const RDPBasic = () => {
  const ref = useRef()

  const inputName = 'reactstrap_date_picker_basic'
  const [value, setValue] = useState("2019-06-01T00:00:00.000Z")
  const [fmtValue, setFmtValue] = useState("06/01/2019")


  //const [value, setValue] = useState("2017-07-21T00:00:00.000Z")
  //const [fmtValue, setFmtValue] = useState("07/21/2017")
  //const minDate = "2017-07-01T12:00:00.000Z"
  //const maxDate = "2017-07-31T12:00:00.000Z"
  
  const handleChange = (v, f) => {
    setValue(v)
    setFmtValue(f)

    // if (ref.current) {
    //   //console.log(ref.current)
    //   console.log(ref.current.getValue())
    //   console.log(ref.current.getFormattedValue())
    // }
  }

  return (
    <FormGroup>
      <Label for={inputName}
             className="valium-reactstrap-label">
        {"Basic"}
      </Label>
      <DatePicker
        name         = {inputName}
        ref = {ref}
        instanceCount= {1}
        value        = {value}
        onChange     = {handleChange}
        showTodayButton= {true}
        showWeeks={true}
        autoFocus={true}
        //minDate= {minDate} maxDate={maxDate}
      />
      <FormText>
        {value 
         ? `Selected date is: ${value} (formatted: ${fmtValue})`
         : 'No date selected'}
      </FormText>
    </FormGroup>
  )
}

export default RDPBasic
