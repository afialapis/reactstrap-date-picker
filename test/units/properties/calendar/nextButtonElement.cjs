import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInput,  getCalendar} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: nextButtonElement', function () {
  // this.timeout(150)


  it("should render custom element nextButtonElement", () => {
    const did = 'calendar-next-button-element'
    const nextButtonElement = <div id="custom-next-button-element"></div>

    const Unit = () => 
      <DatePicker id={did} 
                  nextButtonElement={nextButtonElement} 
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // get the calendar
    const calendar= getCalendar(container)
    
    // check custom button is there
    expect(calendar.querySelector('#custom-next-button-element')).to.exist
    
    
  })

})