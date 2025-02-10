import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInput,  getCalendar} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: previousButtonElement', function () {
  // this.timeout(150)


  it("should render custom element previousButtonElement", () => {
    const did = 'calendar-previous-button-element'
    const previousButtonElement = <div id="custom-previous-button-element"></div>

    const Unit = () => 
      <DatePicker id={did} 
                  previousButtonElement={previousButtonElement} 
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // get the calendar
    const calendar= getCalendar(container)
    
    // check custom button is there
    expect(calendar.querySelector('#custom-previous-button-element')).to.exist
    
    
  })

})