import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInput,  getCalendar} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: dayLabels', function () {
  // this.timeout(300)

  it("should render custom day labels", (done) => {
    //// this.timeout(300)

    const did = 'calendar-day-labels'
    const valueDate = new Date('2011-10-05T14:48:00.000Z')
    const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab']
    
    const Unit = () => 
      <DatePicker id={did} 
                  value={valueDate.toISOString()}
                  dayLabels={spanishDayLabels}
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // get the calendar
    const calendar= getCalendar(container)
    
    // check the day titles
    const dayTitles= calendar.querySelectorAll('table thead tr')[0].querySelectorAll('td small')
    
    dayTitles.forEach( (dayWrap, dayIdx) => {
      expect(dayWrap.innerHTML).to.equal(spanishDayLabels[dayIdx])
    })
    
    

    done()
  })

})
