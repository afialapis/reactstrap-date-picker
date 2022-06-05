import React from 'react' 

const CalendarWeekNum = ({weekNum, cellPadding}) => 
  <td style={{padding: cellPadding, fontSize: '0.8em', color: 'darkgrey'}}
      className="text-muted">
    {weekNum}
  </td>

export {CalendarWeekNum}
