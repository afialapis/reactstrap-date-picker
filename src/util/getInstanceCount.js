const getInstanceCount = () => {
  if (typeof window === 'object') {
    if (window._reactstrapDatePickerInstance == undefined) {
      window._reactstrapDatePickerInstance= 0
    }
    const next= window._reactstrapDatePickerInstance+1
    window._reactstrapDatePickerInstance= next
    return next
  } else if (typeof process === 'object') {
    if (process._reactstrapDatePickerInstance == undefined) {
      process._reactstrapDatePickerInstance= 0
    }
    const next= process._reactstrapDatePickerInstance+1
    process._reactstrapDatePickerInstance= next
    return next
  } else {
    console.error("Reactstrap Date Picker cannot determine environment (it is neither browser's <window> nor Node's <process>).")
    return 1
  }
}

export {getInstanceCount}