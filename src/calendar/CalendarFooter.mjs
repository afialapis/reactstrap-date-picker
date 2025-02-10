import React from 'react' 
import {Button} from 'reactstrap'

const CalendarFooter = ({dayLabels, showWeeks, handleTodayClick, showTodayButton, todayButtonLabel}) => {
  if (!showTodayButton) {
    return null
  }
  
  return (
    <tfoot>
      <tr>
        <td colSpan={dayLabels.length + (showWeeks ? 1 : 0)} style={{ paddingTop: '9px' }}>
          <Button
            block
            size="sm"
            className="u-today-button"
            onClick={() => handleTodayClick()}>
            {todayButtonLabel}
          </Button>
        </td>
      </tr>
    </tfoot>
  )

}

export {CalendarFooter}