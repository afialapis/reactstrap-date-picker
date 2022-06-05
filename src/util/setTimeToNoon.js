const setTimeToNoon = (date) => {
  if (! date) {
    return null
  }
  date.setHours(12 - date.getTimezoneOffset()/60)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export {setTimeToNoon}