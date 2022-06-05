import {useCallback} from 'react'

// NOTE: do we want to use the controlInput or  the hiddenInput here?
// We were previously using the hidden one, but I see no reasons.
// 'change' events would make sense on the hidden input, but focus
// control seems to be more on the control input.
// Anyway, this is not decided here, but when calling useCustomEvents()

const useCustomEvents = (inputRef, onBlur, onFocus) => {
  const customOnBlur = useCallback(() => {
    
    if (onBlur) {
      const event = document.createEvent('CustomEvent')
      event.initEvent('Change Date', true, false)
      inputRef.current.dispatchEvent(event)
      onBlur(event)
    }
  }, [inputRef, onBlur])

  const customOnFocus = useCallback(() => {
    if (onFocus) {
      const event = document.createEvent('CustomEvent')
      event.initEvent('Change Date', true, false)
      inputRef.current.dispatchEvent(event)
      onFocus(event)
    }
  }, [inputRef, onFocus])

  return [customOnBlur, customOnFocus]
}

export { useCustomEvents }