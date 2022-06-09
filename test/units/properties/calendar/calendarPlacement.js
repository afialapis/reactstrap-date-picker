
import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInputWrapper
} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('props:calendar: calendarPlacement', function () {
  this.timeout(250)
  
  it("should allow for a string to determine calendar placement", () => {
    const did = 'calendar-placement-string'
    
    const Unit = () => 
      <DatePicker id={did}
                  calendarPlacement="right"
      />

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    const calendarWrapper= wrapper.find(`div.rdp-popover.fade.right`)
    expect(calendarWrapper.length).to.equal(1)

    wrapper.unmount() 
  })


  it("should allow for a function to determine calendar placement", () => {
    const did = 'calendar-placement-function'
    const handlePlacement = () => "top"

    const Unit = () => 
      <DatePicker id={did}
                  calendarPlacement={handlePlacement}
      />

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    const calendarWrapper= wrapper.find(`div.rdp-popover.fade.top`)
    expect(calendarWrapper.length).to.equal(1)
    
    wrapper.unmount()
  })
})