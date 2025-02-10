import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput
} from '../../../tools/finders'


const {
  expect,
  render,
  fireEvent
} = global

describe('props:calendar: calendar', function () {
  // this.timeout(500)

  it("should allow placing the popover calendar in a container specified in the props.", () => {
    const did = 'calendar-container'
    
    const Unit = () => 
      <>
        <div id="heyho"></div>
        <DatePicker id={did}
                    calendarContainer={'#heyho'}/>
      </>
    const {container} = render(<Unit/>)
  
    const input= getInput(container)
    fireEvent.focus(input)
    
    // check using document
    const calendar= container.querySelector(`div#heyho`)
    expect(calendar).to.exist
    expect(calendar.innerHTML.indexOf('rdp-popover')>=0).to.equal(true)

    // NOTE Dunno if intended/expected, but trough enzyme
    //  wrappers the calendar is always inside the DatePicker tree
    // const calendar= container.querySelector('div#heyho')
  
    
  })
})