import React from 'react'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap'
import {setTimeToNoon} from '../util/setTimeToNoon'
import {CalendarHeader} from './CalendarHeader'
import {CalendarSubHeader} from './CalendarSubHeader'
import {CalendarBody} from './CalendarBody'
import {CalendarFooter} from './CalendarFooter'
import {useCalendarDays} from './useCalendarDays'

const Calendar = (
  {popoverRef, selectedDate, displayDate, minDate, maxDate, onChange, dayLabels, 
    cellPadding, weekStartsOn, showTodayButton, todayButtonLabel, 
    roundedCorners, showWeeks, monthLabels, previousButtonElement, 
    nextButtonElement, pickMonthElement, placement, open, 
    container, target,  onChangeMonth}) => {
  const calendarDays = useCalendarDays(displayDate, selectedDate, minDate, maxDate, weekStartsOn)
  
  const handleDayClick = (e) => {
    const day = e.currentTarget.getAttribute('data-day')
    const newSelectedDate = setTimeToNoon(new Date(displayDate))
    newSelectedDate.setDate(day)
    onChange(newSelectedDate)
  }

  const handleTodayClick = () => {
    const newSelectedDate = setTimeToNoon(new Date())
    onChange(newSelectedDate)
  }
  
  return (
    <>

      <Popover  
          innerRef   = {popoverRef}
          className  = {`rdp-popover ${placement}`}
          //toggle     = {() => handleHide()}
          isOpen     = {open}
          container  = {container}
          target     = {target}
          placement  = {placement}
          // delay      = {200} //  does not apply for us (manual triggering)
      >
        <PopoverHeader tag = "div">
          <CalendarHeader
              previousButtonElement= {previousButtonElement}
              nextButtonElement    = {nextButtonElement}
              pickMonthElement     = {pickMonthElement}
              displayDate          = {displayDate}
              minDate              = {minDate}
              maxDate              = {maxDate}
              onChange             = {(newDisplayDate) => onChangeMonth(newDisplayDate)}
              monthLabels          = {monthLabels}/>
        </PopoverHeader>

        <PopoverBody>
          <table className="rdp-calendar text-center">
            <CalendarSubHeader 
              dayLabels   = {dayLabels}
              showWeeks   = {showWeeks}
              cellPadding = {cellPadding}
            />

            <CalendarBody 
              calendarDays   = {calendarDays}
              showWeeks      = {showWeeks}
              onDayClick     = {handleDayClick}
              cellPadding    = {cellPadding}
              roundedCorners = {roundedCorners}
            />

            <CalendarFooter
              dayLabels         = {dayLabels}
              showWeeks         = {showWeeks}
              handleTodayClick  = {handleTodayClick}
              showTodayButton   = {showTodayButton}
              todayButtonLabel  = {todayButtonLabel}
            />
          </table>
        </PopoverBody>
      </Popover>
    </>
  )
}

export { Calendar }



