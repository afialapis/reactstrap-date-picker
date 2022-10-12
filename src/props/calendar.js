import PropTypes from 'prop-types'
import {propRef, propElemOrString} from './util'

const calendarProps= {  
  dayLabels: PropTypes.array,
  monthLabels: PropTypes.array,
  
  weekStartsOn: PropTypes.number,
  showWeeks: PropTypes.bool,

  previousButtonElement: propElemOrString,
  nextButtonElement: propElemOrString,
  pickMonthElement: propRef,

  showTodayButton: PropTypes.bool,
  todayButtonLabel: PropTypes.string,

  roundedCorners: PropTypes.bool,  // better borderRadius
  cellPadding: PropTypes.string,

  calendarPlacement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  calendarContainer: PropTypes.oneOfType([
    PropTypes.string,
    propRef
  ]),  
}


const calendarDefaultProps= {
  cellPadding : '5px',
  dayLabels   : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabels : ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],
  previousButtonElement: '<',
  nextButtonElement    : '>',
  pickMonthElement     : undefined,
  calendarPlacement    : 'bottom',
  showTodayButton      : false,
  todayButtonLabel     : 'Today',
  showWeeks            : false,
  roundedCorners: false
}

export {calendarProps, calendarDefaultProps}


