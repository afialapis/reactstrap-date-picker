const useCheckProps = (value, defaultValue) => {
  if (value && defaultValue) {
    return 'Conflicting DatePicker properties \'value\' and \'defaultValue\''
  }

  return undefined 
}

export {useCheckProps}