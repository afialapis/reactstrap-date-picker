import {useState, useEffect} from 'react'
import { getMaybeFuncValue } from './getMaybeFuncValue'


const useMaybeFuncProp = (propValue) => {

  const [value, setValue]= useState(getMaybeFuncValue(propValue))

  useEffect(() => {
    setValue(getMaybeFuncValue(propValue))
  }, [propValue])
  
  return [value, setValue]
}



export {useMaybeFuncProp}