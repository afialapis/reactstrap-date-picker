import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInput,  getCalendar} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: monthLabels', function () {
  // this.timeout(150)


  it("should render custom month labels", () => {
    const did = 'calendar-previous-button-element'
    const valueDate = new Date('2011-10-05T14:48:00.000Z')
    const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
                                'Junio', 'Julio', 'Agosto', 'Septiembre',
                                'Octubre', 'Noviembre', 'Diciembre']
    
    const Unit = () => 
      <DatePicker id={did} 
                  value={valueDate.toISOString()}
                  monthLabels={spanishMonthLabels}
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // get the calendar
    const calendar= getCalendar(container)
    
    // check the month title
    const currentMonthLabel = spanishMonthLabels[valueDate.getMonth()]
    const calendarTitle = calendar.querySelector('div.rdp-header-pick-month-wrapper div').innerHTML
    expect(calendarTitle.indexOf(currentMonthLabel)>=0).to.equal(true)
    
    
  })

})