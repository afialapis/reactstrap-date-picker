const getDocument                 = (wrapper) => wrapper.find(`input.form-control`).getDOMNode().ownerDocument

const getHiddenInputWrapper       = (wrapper, did) => wrapper.find(`input#${did}`)
const getHiddenInputNode          = (wrapper, did) => getHiddenInputWrapper(wrapper, did).getDOMNode()
const getHiddenInputValue         = (wrapper, did) => getHiddenInputNode(wrapper, did).value
const getHiddenInputFmtValue      = (wrapper, did) => getHiddenInputNode(wrapper, did).getAttribute('data-formattedvalue')

const getInputWrapper             = (wrapper) => wrapper.find(`input.form-control`)
const getInputNode                = (wrapper) => getInputWrapper(wrapper).getDOMNode()

const getCalendarWrapper          = (wrapper) => wrapper.find(`.rdp-popover`)
const getCalendarNode             = (wrapper) => getCalendarWrapper(wrapper).getDOMNode()

const getCalendarRandomDayWrapper = (wrapper) => wrapper.find(`table tbody tr:last-child td`).at(0)
const getCalendarRandomDayNode    = (wrapper) => getCalendarRandomDayWrapper(wrapper).getDOMNode()

const getCalendarDayWrapper       = (wrapper, row, col) => wrapper.find(`table tbody tr`).at(row).find('td').at(col)
const getCalendarDayNode          = (wrapper, row, col) => getCalendarDayWrapper(wrapper, row, col).getDOMNode()

const getCalendarDayHeaderWrapper = (wrapper, col) => wrapper.find(`table thead tr`).at(0).find('td').at(col)
const getCalendarDayHeaderNode    = (wrapper, col) => getCalendarDayHeaderWrapper(wrapper, col).getDOMNode()

export {
  getDocument,
  getHiddenInputWrapper,
  getHiddenInputNode,
  getHiddenInputValue,
  getHiddenInputFmtValue,
  getInputWrapper,
  getInputNode,
  getCalendarWrapper,
  getCalendarNode,
  getCalendarRandomDayWrapper,
  getCalendarRandomDayNode,
  getCalendarDayWrapper,
  getCalendarDayNode,
  getCalendarDayHeaderWrapper,
  getCalendarDayHeaderNode   
}