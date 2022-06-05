import {useState, useEffect} from 'react'

const _getFixedDayLabels = (dayLabels, weekStartsOn) => {
  if (weekStartsOn > 1) {
    return dayLabels
      .slice(weekStartsOn)
      .concat(dayLabels.slice(0, weekStartsOn))
  }
  
  if (weekStartsOn === 1) {
    return dayLabels.slice(1).concat(dayLabels.slice(0,1))
  }
  
  return dayLabels
}


const useFixedDayLabels = (dayLabels, weekStartsOn) => {

  const [fixedDayLabels, setFixedDayLabels]= useState(_getFixedDayLabels(dayLabels, weekStartsOn))

  useEffect(() => {
    setFixedDayLabels(_getFixedDayLabels(dayLabels, weekStartsOn))
  }, [dayLabels, weekStartsOn])
  
  return fixedDayLabels
}

export {useFixedDayLabels}