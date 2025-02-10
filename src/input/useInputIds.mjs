import {useState, useEffect} from 'react'
import {getInstanceCount} from '../util/getInstanceCount'

const _getIdSuffix = (id, name) => {
  // Try <id> or <name> props to determine elements' id suffix
  if (id!=undefined && id!='')
    return id
  if (name!=undefined && name!='')
    return name
  // If none was passed, use global vars
  const iCount= getInstanceCount()
  return iCount.toString()
}


const _getInputIds = (id, name, customControl) => {
  const idSuffix = _getIdSuffix(id, name)
  const group= `rdp-input-group-${idSuffix}`
  const hidden = id!=undefined ? id : `rdp-hidden-${idSuffix}`
  let control= `rdp-form-control-${idSuffix}`
  if (customControl!=undefined && customControl?.props?.id) {
    control= customControl.props.id
  }
  const overlay = `rdp-overlay-${idSuffix}`
  return [group, hidden, control, overlay]
}


const useInputIds = (id, name, customControl) => {

  const [inputIds, setInputIds]= useState(_getInputIds(id, name, customControl))

  useEffect(() => {
    setInputIds(_getInputIds(id, name, customControl))
  }, [id, name, customControl])
  
  return inputIds
}



export {useInputIds}