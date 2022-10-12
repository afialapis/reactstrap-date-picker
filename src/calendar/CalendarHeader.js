
import React, {useState, useEffect} from 'react'
import {compareMonths} from '../util/compareMonths'

function CalendarHeader ({
   previousButtonElement, nextButtonElement, pickMonthElement,
   displayDate, minDate, maxDate, onChange, monthLabels}) {
  
  const [displayingMinMonth, setDisplayingMinMonth]= useState(false)
  const [displayingMaxMonth, setDisplayingMaxMonth]= useState(false)
  const [title, setTitle]= useState('')
 
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
      setTitle(`${monthLabels[displayDate.getMonth()]} ${displayDate.getFullYear()}`)
    } catch(e) {
      console.error(e)
    }

  }, [displayDate, minDate, maxDate, monthLabels])

  
  const handleChangeMonth = (inc) => {
    const newDisplayDate = new Date(displayDate)
    newDisplayDate.setDate(1)
    newDisplayDate.setMonth(newDisplayDate.getMonth() + inc)
    onChange(newDisplayDate)
  }

  return (
    <div className="rdp-header text-center" style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap', width: '100%'}}>
      <div className= "text-muted rdp-header-previous-wrapper" 
            onClick  = {() => handleChangeMonth(-1)}
            style    = {{cursor: 'pointer', userSelect: 'none'}}>
        {displayingMinMonth ? null : previousButtonElement}
      </div>
      
      <div style={{flex: 'auto'}}>{
        pickMonthElement==null
        ? title
        : <pickMonthElement/> 
      }</div>
      <div className= "text-muted rdp-header-next-wrapper" 
            onClick  = {() => handleChangeMonth(+1)} 
            style    = {{cursor: 'pointer', userSelect: 'none'}}>
        {displayingMaxMonth ? null : nextButtonElement}
      </div>
    </div>
  )

}

export {CalendarHeader}
