const getMaybeFuncValue = (value) => {
  const tag = Object.prototype.toString.call(value)
  const isFunction = tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]'
  if (isFunction) {
    return value()
  }
  else {
    return value
  }  
}


export { getMaybeFuncValue }