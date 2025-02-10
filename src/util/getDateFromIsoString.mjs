import {setTimeToNoon} from './setTimeToNoon'

const getDateFromIsoString = (isoString) =>
  isoString ? setTimeToNoon(new Date(isoString)) : null
  //isoString ? new Date(`${isoString.slice(0,10)}T12:00:00.000Z`) : null
  

export { getDateFromIsoString }