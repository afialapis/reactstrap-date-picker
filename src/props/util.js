import PropTypes from 'prop-types'

let Element = typeof Element === 'undefined' 
  ? function(){} 
  : Element


const propRef= PropTypes.oneOfType([
  PropTypes.func, 
  PropTypes.shape({ current: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    undefined
  ])})
  //PropTypes.shape({ current: PropTypes.any })
])

const propElemOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
])

export {propRef, propElemOrString}