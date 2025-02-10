import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInput,  getCalendar} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global

describe('props:calendar: pickMonthElement', function () {
  // this.timeout(150)


  it("should render custom element pickMonthElement", () => {
    const did = 'calendar-previous-button-element'
    const pickMonthElement = () => <div id="custom-pick-month-element"></div>

    const Unit = () => 
      <DatePicker id={did} 
                  pickMonthElement={pickMonthElement} 
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // get the calendar
    const calendar= getCalendar(container)
    
    // check custom button is there
    expect(calendar.querySelector('#custom-pick-month-element')).to.exist
    
    
  })

})