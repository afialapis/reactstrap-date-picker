import React  from 'react'
import PropTypes from 'prop-types'
import {propRef} from './util'

const inputProps = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  inputRef: propRef,
  customControl: PropTypes.object,
  noValidate: PropTypes.bool,
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


