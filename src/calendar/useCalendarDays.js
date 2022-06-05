import {useState, useEffect} from 'react'
import {setTimeToNoon} from '../util/setTimeToNoon'

const DAYS_BY_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
  groupByWeeks: {
   year,
   month,
   weeks: [
      {weekNum: N,
      wekDays: [
        {inMonth: true, day: N, mode: ''}
        or
        {inMonth: false}
        ]
      },...
      ]
  }
 */

function _groupByWeeks(year, month, weekStartsOn) {
  if (year == undefined || month == undefined) {
    return undefined
  }

  const firstDay = new Date(year, month, 1)
  const startingDay = weekStartsOn > 1
    ? firstDay.getDay() - weekStartsOn + 7
    : weekStartsOn === 1
      ? (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1)
      : firstDay.getDay();

  let monthLength = DAYS_BY_MONTH[month]
  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      monthLength = 29;
    }
  }
  
  const isInMonth = (monthDay, weekIndex, weekDay) => {
    if (monthDay <= monthLength && (weekIndex > 0 || weekDay >= startingDay)) {
      return true
    }
    return false
  }

  const getWeekNumber = (monthDay) => {
    const date   = new Date(year, month, monthDay - 1, 12, 0, 0, 0)
    const target = new Date(date.valueOf());
    const dayNr  = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }
  

  const allWeeks = []
  let monthDay = 1
  for (let weekIndex = 0; weekIndex < 9; weekIndex++) {
    const weekDays = []
    for (let weekDay = 0; weekDay <= 6; weekDay++) {
      if (isInMonth(monthDay, weekIndex, weekDay)) {
        weekDays.push({
          inMonth: true,
          day: monthDay
        })
        monthDay+= 1
      } else {
        weekDays.push({
          inMonth: false       
        })
      }
    }
    
    const weekNum = getWeekNumber(monthDay)

    allWeeks.push({
      weekDays,
      weekNum
    })

    if (monthDay > monthLength) {
      break
    }
  }
  
  return {
    year, month, weeks: allWeeks
  }

}



/**
  calendarDays: [
  {weekNum: N,
   wekDays: [
     {inMonth: true, day: N, mode: ''}
     or
     {inMonth: false}
    ]
  },...
  ]
 */

function _makeCalendarDays(groupByWeeks, selectedDate, minDate, maxDate) {

  if (groupByWeeks==undefined) {
    return []
  }


  const getDayMode = (day) => {
    const date= setTimeToNoon(new Date(groupByWeeks.year, groupByWeeks.month, day, 12, 0, 0, 0)).toISOString()
    

    const beforeMinDate = minDate!=undefined ? (Date.parse(date) < Date.parse(setTimeToNoon(new Date(minDate)))) : false
    const afterMaxDate  = maxDate!=undefined ? (Date.parse(date) > Date.parse(setTimeToNoon(new Date(maxDate)))) : false
    const currentDate   = setTimeToNoon(new Date())
    const nSelectedDate = setTimeToNoon(new Date(selectedDate))

    if (beforeMinDate || afterMaxDate) {
      return 'muted'
    } else if (Date.parse(date) === Date.parse(nSelectedDate)) {
      return 'selected'
    } else if (Date.parse(date) === Date.parse(currentDate)) {
      return 'current'
    } else {
      return 'normal'
    }
  }

  let calendarDays= []

  groupByWeeks.weeks.map(week => {
    const weekNum= week.weekNum
    const weekDays = week.weekDays.map(weekDay => {
      return {
        ...weekDay,
        mode: weekDay.inMonth ? getDayMode(weekDay.day) : undefined
      }
    })
    calendarDays.push({
      weekNum,
      weekDays
    })
  })

  return calendarDays
}

function useCalendarDays(displayDate, selectedDate, minDate, maxDate, weekStartsOn) {
  const [year, setYear]= useState(undefined)
  const [month, setMonth]= useState(undefined)
  const [groupByWeeks, setGroupByWeeks]= useState(undefined)
  const [calendarDays, setCalendarDays]= useState([])
  

  useEffect(() => {
    if (displayDate) {
      setYear(displayDate.getFullYear())
      setMonth(displayDate.getMonth())
    }
  }, [displayDate])


  useEffect(() => {
    setGroupByWeeks(_groupByWeeks(year, month, weekStartsOn))
  }, [year, month, weekStartsOn])

  useEffect(() => {
    setCalendarDays(_makeCalendarDays(groupByWeeks, selectedDate, minDate, maxDate))
  }, [groupByWeeks, selectedDate, minDate, maxDate])


  return calendarDays
}


export {useCalendarDays}