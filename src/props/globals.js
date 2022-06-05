import PropTypes from 'prop-types'
import {propElemOrString} from './util'

const globalProps= {
  id: PropTypes.string,
  name: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  clearButtonElement: propElemOrString,
  showClearButton: PropTypes.bool,
  dateFormat: PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node

  ])
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


