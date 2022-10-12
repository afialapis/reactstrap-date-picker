import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap'
import {DatePicker} from '../rdp'

const MONTH_NAMES= ['January', 'February', 'March', 'April',
'May', 'June', 'July', 'August', 'September',
'October', 'November', 'December']

const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024]

const PickMonthElement = ({displayDate, minDate, maxDate, onChangeMonth, onChangeYear}) => {
  const [month, setMonth]= useState((new Date(displayDate)).getMonth())
  const [year, setYear]= useState((new Date(displayDate)).getFullYear())

  useEffect(() => {
    setMonth((new Date(displayDate)).getMonth())
    setYear((new Date(displayDate)).getFullYear())
  }, [displayDate])

  const handleChangeMonth = (ev) => {
    const m= ev.target.value
    setMonth(m)
    onChangeMonth(m)
  }

  const handleChangeYear = (ev) => {
    const y= ev.target.value
    setYear(y)
    onChangeYear(y)
  }  

  return (
    <div style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap', width: '100%'}}>
      <div style={{flex: '60%'}}>
        <Input
          type="select"
          value={month}
          onChange={handleChangeMonth}>
          {
            MONTH_NAMES.map((lmonth, lidx) => {
              return (
                <option key={`month_${lidx}`}
                        value={lidx}>
                  {lmonth}
                </option>
              )
            })
          }
        </Input>
      </div>
      <div style={{flex: '40%'}}>
      <Input
          type="select"
          value={year}
          onChange={handleChangeYear}>
          {
            YEARS.map(lyear => {
              return (
                <option key={`year${lyear}`}
                        value={lyear}>
                  {lyear}
                </option>
              )
            })
          }
        </Input>
      </div>
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
        pickMonthElement= {PickMonthElement}           
      /> 
      <FormText>
        {'Custom elements can be used as Month/Year picker'}
      </FormText>
    </FormGroup>
  )
}

export default RDPCustomPickMonth
