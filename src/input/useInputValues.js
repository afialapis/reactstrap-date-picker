import {useState, useEffect /*, useCallback*/} from 'react'
import { getDateFromIsoString } from '../util/getDateFromIsoString'
import { getIsoStringFromDate } from '../util/getIsoStringFromDate'

const _makeInputValueString = (date, separator, dateFormat) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (dateFormat.match(/MM.DD.YYYY/)) {
    return (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`) + separator + date.getFullYear()
  }
  else if (dateFormat.match(/DD.MM.YYYY/)) {
    return (day > 9 ? day : `0${day}`) + separator + (month > 9 ? month : `0${month}`) + separator + date.getFullYear()
  }
  else {
    return date.getFullYear() + separator + (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`)
  }
}

const useInputValues = (controlInputRef, value, defaultValue, minDate, maxDate, dateFormat, onClear, onChange) => {
  const [separator, setSeparator]= useState(dateFormat.match(/[^A-Z]/)[0])
  const [innerValue, setInnerValue]= useState(null)
  const [inputValue, setInputValue]= useState(null)
  const [displayDate, setDisplayDate]= useState(null)
  const [selectedDate, setSelectedDate]= useState(null)
  


  // handle props changes
  useEffect(() => {
    setSeparator(dateFormat.match(/[^A-Z]/)[0])
  }, [dateFormat])


  // handle input values
  useEffect(() => {
    const isoString= value || defaultValue
    const minDate = getDateFromIsoString(minDate)
    const maxDate = getDateFromIsoString(maxDate)



    const nSelectedDate = getDateFromIsoString(isoString)
    const nInnerValue = getIsoStringFromDate(nSelectedDate)
    const nInputValue = isoString ? _makeInputValueString(nSelectedDate, separator, dateFormat) : null

    let nDisplayDate
    if (nSelectedDate) {
      //nDisplayDate = new Date(nSelectedDate)
      nDisplayDate = nSelectedDate
    } else {
      const today = getDateFromIsoString(new Date().toISOString())
      if (minDate && Date.parse(minDate) >= Date.parse(today)){
        nDisplayDate = minDate
      } else if (maxDate && Date.parse(maxDate) <= Date.parse(today)){
        nDisplayDate = maxDate
      } else {
        nDisplayDate = today
      }
    }
    
    setInnerValue(nInnerValue)
    setInputValue(nInputValue)
    setSelectedDate(nSelectedDate)
    setDisplayDate(nDisplayDate)

  }, [value, defaultValue, minDate, maxDate, separator, dateFormat])

  //
  const handleClear = /*useCallback(*/() => {
    if (onClear) {
      onClear()
    }
    else {
      setInnerValue(null)
      setInputValue(null)
      setSelectedDate(null)
      setDisplayDate(null)

      if (onChange) {
        onChange(null, null)
      }
    }
  }/*, [onClear, onChange])*/

  const handleBadInput = /*useCallback(*/(originalValue, tail= false) => {
    
    const parts = originalValue.replace(new RegExp(`[^0-9${separator}]`), '').split(separator)

    if (dateFormat.match(/MM.DD.YYYY/) || dateFormat.match(/DD.MM.YYYY/)) {
      if (parts[0] && parts[0].length > 2) {
        parts[1] = parts[0].slice(2) + (parts[1] || '')
        parts[0] = parts[0].slice(0, 2)
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '')
        parts[1] = parts[1].slice(0, 2)
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0,4)
        if (tail) {
          if (parts[2].length < 4) {
            parts[2]= parts[2].padEnd(4, '0')
          }
        }
      }
    } else {
      if (parts[0] && parts[0].length > 4) {
        parts[1] = parts[0].slice(4) + (parts[1] || '')
        parts[0] = parts[0].slice(0, 4)
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '')
        parts[1] = parts[1].slice(0, 2)
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0,2)
      }
    }
    const nInputValue= parts.join(separator)
    setInputValue(nInputValue)
  }/*, [dateFormat, separator])*/

  const handleBadInputOnBlur = () => {
    const originalValue = controlInputRef?.current?.value || ''
    if (originalValue) {
      handleBadInput(originalValue, true)
    }
  }

  const handleInputChange = /*useCallback(*/() => {
    const originalValue = controlInputRef?.current?.value || ''
    const nInputValue = originalValue.replace(/(-|\/\/)/g, separator).slice(0,10)
    
    if (!nInputValue) {
      handleClear()
      return
    }

    let month, day, year
    if (dateFormat.match(/MM.DD.YYYY/)) {
      if (!nInputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        return handleBadInput(originalValue)
      }

      month = nInputValue.slice(0,2).replace(/[^0-9]/g, '')
      day = nInputValue.slice(3,5).replace(/[^0-9]/g, '')
      year = nInputValue.slice(6,10).replace(/[^0-9]/g, '')
    } else if (dateFormat.match(/DD.MM.YYYY/)) {
      if (!nInputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        return handleBadInput(originalValue)
      }

      day = nInputValue.slice(0,2).replace(/[^0-9]/g, '')
      month = nInputValue.slice(3,5).replace(/[^0-9]/g, '')
      year = nInputValue.slice(6,10).replace(/[^0-9]/g, '')
    } else {
      if (!nInputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        return handleBadInput(originalValue)
      }

      year = nInputValue.slice(0,4).replace(/[^0-9]/g, '')
      month = nInputValue.slice(5,7).replace(/[^0-9]/g, '')
      day = nInputValue.slice(8,10).replace(/[^0-9]/g, '')
    }

    const monthInteger = parseInt(month, 10)
    const dayInteger = parseInt(day, 10)
    const yearInteger = parseInt(year, 10)
    if (monthInteger > 12 || dayInteger > 31) {
      return handleBadInput(originalValue)
    }

    const beforeMinDate = minDate && Date.parse(originalValue) < Date.parse(minDate)
    const afterMaxDate = maxDate && Date.parse(originalValue) > Date.parse(maxDate)

    if (beforeMinDate || afterMaxDate) {
      return handleBadInput(originalValue)
    }

    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      const nSelectedDate = getDateFromIsoString(new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0).toISOString())
      const nInnerValue = getIsoStringFromDate(nSelectedDate)

      setSelectedDate(nSelectedDate)
      setDisplayDate(nSelectedDate)
      setInnerValue(nInnerValue)

      if (onChange) {
        onChange(nInnerValue, nInputValue)
      }
    }

    setInputValue(nInputValue)
  }/*, [controlInputRef, separator, onChange, minDate, maxDate])*/

  const handleChangeMonth = (nDisplayDate) => {
    setDisplayDate(nDisplayDate)
  }

  const handleChangeDate = /*useCallback(*/(nSelectedDate) => {
    const nInnerValue = getIsoStringFromDate(nSelectedDate)
    const nInputValue = _makeInputValueString(nSelectedDate, separator, dateFormat)

    setInputValue(nInputValue)
    setSelectedDate(nSelectedDate)
    setDisplayDate(nSelectedDate)
    setInnerValue(nInnerValue)

    if (onChange) {
      onChange(nInnerValue, nInputValue)
    }
  }/*, [separator, dateFormat, onChange])*/


  return [innerValue, inputValue, displayDate, selectedDate, handleClear, handleInputChange, handleChangeMonth, handleChangeDate, handleBadInputOnBlur]

}



export { useInputValues }