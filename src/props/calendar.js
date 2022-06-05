import PropTypes from 'prop-types'
import {propRef, propElemOrString} from './util'

const calendarProps= {
  cellPadding: PropTypes.string,
  
  dayLabels: PropTypes.array,
  monthLabels: PropTypes.array,
  
  weekStartsOn: PropTypes.number,
  previousButtonElement: propElemOrString,
  nextButtonElement: propElemOrString,
  calendarPlacement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  calendarContainer: PropTypes.oneOfType([
    PropTypes.string,
    propRef
  ]),
  showTodayButton: PropTypes.bool,
  todayButtonLabel: PropTypes.string,
  roundedCorners: PropTypes.bool,
  showWeeks: PropTypes.bool,
}


const calendarDefaultProps= {
  cellPadding : '5px',
  dayLabels   : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabels : ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],
  previousButtonElement: '<',
  nextButtonElement    : '>',
  calendarPlacement    : 'bottom',
  showTodayButton      : false,
  todayButtonLabel     : 'Today',
  showWeeks            : false,
  roundedCorners: false
}

export {calendarProps, calendarDefaultProps}


