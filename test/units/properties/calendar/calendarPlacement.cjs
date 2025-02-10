
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


describe('props:calendar: calendarPlacement', function () {
  // this.timeout(250)
  
  it("should allow for a string to determine calendar placement", () => {
    const did = 'calendar-placement-string'
    
    const Unit = () => 
      <DatePicker id={did}
                  calendarPlacement="right"
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    fireEvent.focus(input)

    const calendar= container.querySelector(`div.rdp-popover.fade.right`)
    expect(calendar).to.exist

     
  })


  it("should allow for a function to determine calendar placement", () => {
    const did = 'calendar-placement-function'
    const handlePlacement = () => "top"

    const Unit = () => 
      <DatePicker id={did}
                  calendarPlacement={handlePlacement}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    fireEvent.focus(input)

    const calendar= container.querySelector(`div.rdp-popover.fade.top`)
    expect(calendar).to.exist
    
    
  })
})