import React from 'react'

const CAL_DAY_CLASSNAME_BY_MODE= {
  'normal': '',
  'muted': 'text-muted',
  'selected': 'bg-primary',
  'current': 'text-primary'
}

const CalendarDayInMonth = ({day, mode, onDayClick, cellPadding, roundedCorners}) => {

  const handleClick = (ev) => {
    if (mode!='muted') {
      onDayClick(ev)
    }
  }

  return (
    <td
        data-day = {day}
        onClick  = {handleClick}
        style    = {{ cursor: mode=='muted' ? 'default' : 'pointer', 
                      padding: cellPadding, 
                      borderRadius: roundedCorners ? '5px' : '0px' }}
        className= {CAL_DAY_CLASSNAME_BY_MODE[mode]}>
        {day}
    </td>

  )
}

export {CalendarDayInMonth}

