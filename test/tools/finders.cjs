const getHiddenInput         = (container, did) => container.querySelector(`input#${did}`)
const getHiddenInputValue    = (container, did) => getHiddenInput(container, did).value
const getHiddenInputFmtValue = (container, did) => getHiddenInput(container, did).getAttribute('data-formattedvalue')
const getInput               = (container) => container.querySelector(`input.form-control`)
const getCalendar            = (container) => container.querySelector(`div.rdp-popover`)
const getCalendarRandomDay   = (container) => container.querySelectorAll(`table tbody tr:last-child td`)[0]
const getCalendarDay         = (container, row, col) => container.querySelectorAll(`table tbody tr`)[row].querySelectorAll('td')[col]
const getCalendarDayHeader   = (container, col) => container.querySelectorAll(`table thead tr`)[0].querySelectorAll('td')[col]

export {
  getHiddenInput,
  getHiddenInputValue,
  getHiddenInputFmtValue,
  getInput,
  getCalendar,
  getCalendarRandomDay,
  getCalendarDay,
  getCalendarDayHeader  
}
