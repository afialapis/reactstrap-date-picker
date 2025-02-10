import React, {useState, useEffect} from 'react'
import {Input} from 'reactstrap'

const _getYearList = (minDate, maxDate) => {
  const minYear= minDate
    ? (new Date(minDate)).getFullYear()
    : 1970
  const maxYear= maxDate
    ? (new Date(maxDate)).getFullYear()
    : 2045
  let yList= []
  for (let y=minYear; y<=maxYear; y++) {
    yList.push(y)
  }
  return yList
}


const PickMonthDefault = ({displayDate, minDate, maxDate, monthLabels, onChangeMonth, onChangeYear}) => {
  const [month, setMonth]= useState((new Date(displayDate)).getMonth())
  const [year, setYear]= useState((new Date(displayDate)).getFullYear())
  const [yearList, setYearList] = useState(_getYearList(minDate, maxDate))

  useEffect(() => {
    setMonth((new Date(displayDate)).getMonth())
    setYear((new Date(displayDate)).getFullYear())
  }, [displayDate])

  useEffect(() => {
    setYearList(_getYearList(minDate, maxDate))
  }, [minDate, maxDate])

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
    <div className= "rdp-header-pick-month-default"
         style={{display: 'flex', flexFlow: 'row', flexWrap: 'nowrap'}}>
      <div className= "rdp-header-pick-month-default-month"
           style={{flex: '2 1 auto'}}>
        <Input
          type="select"
          name="rdp-header-pick-month-default-month"
          style={{lineHeight: "1.5", fontSize: "0.875rem", padding: "0.2rem"}}
          value={month}
          onChange={handleChangeMonth}>
          {
            monthLabels.map((lmonth, lidx) => {
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
      <div className= "rdp-header-pick-month-default-year"
           style={{flex: '1 1 67px'}}>
      <Input
          type="select"
          name="rdp-header-pick-month-default-year"
          style={{lineHeight: "1.5", fontSize: "0.875rem", padding: "0.2rem"}}
          value={year}
          onChange={handleChangeYear}>
          {
            yearList.map(lyear => {
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

export default PickMonthDefault
