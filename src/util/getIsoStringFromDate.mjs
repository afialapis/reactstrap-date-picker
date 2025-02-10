import {setTimeToNoon} from './setTimeToNoon'

const getIsoStringFromDate = (date) =>
  date ? setTimeToNoon(date).toISOString() : null
  //date ? `${date.toISOString().slice(0,10)}T12:00:00.000Z` : null

export { getIsoStringFromDate }