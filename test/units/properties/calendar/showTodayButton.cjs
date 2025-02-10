import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getCalendar,
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: showTodayButton / todayButtonLabel', function () {
  // this.timeout(150)


  it('should render with today button element', () => {
    const did = 'today-button'
    const todayButtonLabel = "Today is the day"
    
    const Unit = () => 
      <DatePicker id={did}
                  showTodayButton={true}
                  todayButtonLabel={todayButtonLabel}
      />

    const {container} = render(<Unit/>)

    // focus and open calendar
    const input= getInput(container)
    fireEvent.focus(input)    
    
    // get today button
    const calendar= getCalendar(container)
    const today = calendar.querySelector('button.u-today-button')

    // check the label
    expect(today.innerHTML).to.equal(todayButtonLabel)
    
    
  })
})