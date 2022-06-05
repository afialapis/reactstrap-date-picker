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
  const controlInputRef = inputRef || useRef()

  // NOTE: do we want to use the controlInput or  the hiddenInput here?
  const [customOnBlur, customOnFocus] = useCustomEvents(/*hiddenInputRef*/ controlInputRef, onBlur, onFocus)

  // Control the click outside
  useEffect(() => {
    //console.log('useCalendarProps.useEffect(1)')
    function handleClickOutside(event) {
      event.stopPropagation()

      if (open) {
        if (overlayContainerRef && overlayContainerRef.current && !overlayContainerRef.current.contains(event.target)) {

          console.log('CLICK OUTSIDE!')
          setOpen(false)
          customOnBlur()
        }
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, overlayContainerRef, customOnBlur])


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
    //console.log('handleFocus')
    const nPlacement = getMaybeFuncValue(calendarPlacement)
    setPlacement(nPlacement)

    setOpen(true)
    customOnFocus()
  }, [calendarPlacement, customOnFocus])

  const handleBlur = (force) => {
    //console.log('handleBlur ' + open + ' --- ' + force)
    

    if (open && !force) {
      // allow interactinos on Calendar without closing it
      return
    }

    setOpen(false)
    customOnBlur()  
  }

  return [hiddenInputRef, overlayContainerRef, controlInputRef, open, placement, handleFocus, handleBlur]
}

export { useCalendarProps }

