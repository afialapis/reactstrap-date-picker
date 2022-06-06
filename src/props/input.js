//import React  from 'react'
import PropTypes from 'prop-types'
import {propRef} from './util'

const inputProps = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  noValidate: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,

  className: PropTypes.string,
  style: PropTypes.object,
  
  inputRef: propRef,
  customControl: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node

  ])
}

const inputDefaultrops= {
  autoFocus            : false,
  disabled             : false,
  autoComplete         : 'on',
  /*style: {
    width: '100%'
  },*/
  noValidate: false
}

export {inputProps, inputDefaultrops}


