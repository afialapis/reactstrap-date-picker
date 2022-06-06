import PropTypes from 'prop-types'
import {propElemOrString} from './util'

const globalProps= {
  value: PropTypes.string,  
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  dateFormat: PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  clearButtonElement: propElemOrString,
  showClearButton: PropTypes.bool
}


const defaultDateFormat= () => {
  const language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : ''
  const dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
  return dateFormat
}

const globalDefaultProps= {
  clearButtonElement   : '×',
  dateFormat           : defaultDateFormat(),
  showClearButton      : true
}

export {globalProps, globalDefaultProps}


