import PropTypes from 'prop-types'

const propRef= PropTypes.oneOfType([
  // Either a function
  PropTypes.func, 
  // Or the instance of a DOM native element (see the note about SSR)
  PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  // PropTypes.shape({ current: PropTypes.any })
])

const propElemOrString = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
])

export {propRef, propElemOrString}