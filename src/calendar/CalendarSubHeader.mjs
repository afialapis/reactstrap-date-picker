import React from 'react' 

const CalendarSubHeader = ({dayLabels, showWeeks, cellPadding}) => 

  <thead>
    <tr>
      {showWeeks 
        ? <td className="text-muted current-week"
              style={{padding: cellPadding}} /> 
        : null
      }
      {dayLabels.map((label, index) => 
          <td key={index}
              className="text-muted"
              style={{padding: cellPadding}}>
            <small>{label}</small>
          </td>
      )}
    </tr>
  </thead>

export {CalendarSubHeader}