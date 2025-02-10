
import React, {useState, useEffect} from 'react'
import {compareMonths} from '../util/compareMonths'
import PickMonthDefault from './pickmonth/PickMonthDefault'

function CalendarHeader ({
   previousButtonElement, nextButtonElement, pickMonthElement,
   displayDate, minDate, maxDate, onChange, monthLabels}) {
  
  const [displayingMinMonth, setDisplayingMinMonth]= useState(false)
  const [displayingMaxMonth, setDisplayingMaxMonth]= useState(false)
  const [title, setTitle]= useState('')
  const PickMonthElement = pickMonthElement
 
  useEffect(() => {
    if (displayDate==undefined) {
      return 
    }
    
    if (!minDate) {
      setDisplayingMinMonth(false)
    } else {
      setDisplayingMinMonth(compareMonths(displayDate, minDate))
    }
    
    if (!maxDate) {
      setDisplayingMaxMonth(false)
    } else {
      setDisplayingMaxMonth(compareMonths(displayDate, maxDate))
    }

    try {
      if (monthLabels) {
        setTitle(`${monthLabels[displayDate.getMonth()]} ${displayDate.getFullYear()}`)
      }
    } catch(e) {
      console.error(e)
    }

  }, [displayDate, minDate, maxDate, monthLabels])

  
  const handleChangeMonthIncr = (inc) => {
    const newDisplayDate = new Date(displayDate)
    newDisplayDate.setMonth(newDisplayDate.getMonth() + inc, 1)
    onChange(newDisplayDate)
  }

  const handleChangeMonth = (m) => {
    const newDisplayDate = new Date(displayDate)
    newDisplayDate.setMonth(m)
    onChange(newDisplayDate)
  }

  const handleChangeYear = (y) => {
    const newDisplayDate = new Date(displayDate)
    newDisplayDate.setFullYear(y)
    onChange(newDisplayDate)
  }

  return (
    <div className="rdp-header text-center" style={{display: 'flex', flexFlow: 'row', flexWrap: 'nowrap'}}>
      <div className= "text-muted rdp-header-previous-wrapper" 
            onClick  = {() => handleChangeMonthIncr(-1)}
            style    = {{cursor: 'pointer', userSelect: 'none', flexBasis: '1.25em', alignSelf: 'center'}}>
        {displayingMinMonth ? null : previousButtonElement}
      </div>
      
      <div className= "rdp-header-pick-month-wrapper"
           style={{flex: '1 1 auto'}}>{
        (PickMonthElement==null || PickMonthElement==='none')
        ? <div>{title}</div>
        : PickMonthElement==='default'
        ? <PickMonthDefault
            displayDate   = { displayDate }
            monthLabels   = { monthLabels }
            minDate       = { minDate }
            maxDate       = { maxDate }
            onChangeMonth = { (m) => handleChangeMonth(m) }
            onChangeYear  = { (y) => handleChangeYear(y) }/>
        : <PickMonthElement
            displayDate   = { displayDate }
            minDate       = { minDate }
            maxDate       = { maxDate }
            onChangeMonth = { (m) => handleChangeMonth(m) }
            onChangeYear  = { (y) => handleChangeYear(y) }/>
        
      }</div>
      <div className= "text-muted rdp-header-next-wrapper" 
            onClick  = {() => handleChangeMonthIncr(+1)} 
            style    = {{cursor: 'pointer', userSelect: 'none', flexBasis: '1.25em', alignSelf: 'center'}}>
        {displayingMaxMonth ? null : nextButtonElement}
      </div>
    </div>
  )

}

export {CalendarHeader}
