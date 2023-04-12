import {useState, useEffect, useCallback, useRef} from 'react'
import { useCustomEvents } from '../input/useCustomEvents'
import { getMaybeFuncValue } from '../util/getMaybeFuncValue'

// About autoFocus
// We could handle by our own through ref callbacks
//   (https://blog.maisie.ink/react-ref-autofocus/)
// But let's just use react's autoFocus attribute by now

const useCalendarProps = (calendarPlacement, inputRef, autoFocus, onBlur, onFocus) => {
  const [open, setOpen] = useState(false)
  
  const [placement, setPlacement] = useState(getMaybeFuncValue(calendarPlacement))

  const hiddenInputRef = useRef()
  const overlayContainerRef = useRef()
  const controlInputRef = typeof inputRef == 'object'
                          ? inputRef
                          : useRef(inputRef) // eslint-disable-line react-hooks/rules-of-hooks

  // NOTE: do we want to use the controlInput or  the hiddenInput here?
  const [customOnBlur, customOnFocus] = useCustomEvents(/*hiddenInputRef*/ controlInputRef, onBlur, onFocus)

  const isOutside = useCallback((event) => {
    const outOfOverlay = (overlayContainerRef?.current==undefined) || (!overlayContainerRef.current.contains(event.target))
    const outOfControlInput = (controlInputRef?.current==undefined) || (!controlInputRef.current.contains(event.target))
    const isOut= (outOfOverlay && outOfControlInput)
    return isOut
  }, [overlayContainerRef, controlInputRef])

  // Control the click outside
  useEffect(() => {
    function handleClickOutside(event) {
      event.stopPropagation()

      if (open) {
        if (isOutside(event)) {
          setOpen(false)
          customOnBlur()
        }
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, isOutside, customOnBlur])


  //
  //  This callback is bound to Calendar.Popover's toggle() method,
  //    but seems it's unneccesary 
  //  Leaving, by now, this testimonial comments
  //
  //  const handleHide = () => {
  //    let inputFocused = false
  //    try {
  //      inputFocused= controlInputRef.current==document.activeElement
  //    } catch(e) {}
  //    
  //    if (inputFocused) {
  //      return
  //    }
  //    setOpen(false)
  //    customOnBlur()
  //  }

  const handleFocus = useCallback(() => {
    const nPlacement = getMaybeFuncValue(calendarPlacement)
    setPlacement(nPlacement)

    setOpen(true)
    customOnFocus()
  }, [calendarPlacement, customOnFocus])

  const handleBlur = useCallback((event) => {
    if (isOutside(event)) {
      setOpen(false)
      customOnBlur()  
    }
  }, [isOutside, customOnBlur])

  return [hiddenInputRef, overlayContainerRef, controlInputRef, open, placement, handleFocus, handleBlur]
}

export { useCalendarProps }

