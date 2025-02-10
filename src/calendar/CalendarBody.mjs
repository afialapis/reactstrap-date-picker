import React from 'react' 
import {CalendarDayOutOfMonth} from './CalendarDayOutOfMonth'
import {CalendarDayInMonth} from './CalendarDayInMonth'
import {CalendarWeekNum} from './CalendarWeekNum'

const CalendarBody = ({calendarDays, showWeeks, onDayClick, cellPadding, roundedCorners}) => {
  if (! calendarDays) {
    return <tbody></tbody>
  }

  return (
    <tbody>
     {calendarDays.map( (week, weekIndex) => 
       <tr key={`rdp_calendar_week_${weekIndex}`}>
        {showWeeks
         ? <CalendarWeekNum
            key={`rdp_calendar_week_${weekIndex}_weeknum`}
            weekNum     = {week.weekNum}
            cellPadding = {cellPadding}/>
         : null
        }
        {week.weekDays.map((weekDay, weekDayIndex) => 
          weekDay.inMonth
          ? <CalendarDayInMonth
              key={`rdp_calendar_week_${weekIndex}_day_${weekDayIndex}`}
              day= {weekDay.day}
              mode= {weekDay.mode}
              onDayClick= {onDayClick}
              cellPadding= {cellPadding}
              roundedCorners= {roundedCorners}
            /> 
          : <CalendarDayOutOfMonth 
             key={`rdp_calendar_week_${weekIndex}_day_${weekDayIndex}`}/>
        )}
       </tr>
     )}
    </tbody> 
  )
}

export {CalendarBody}
