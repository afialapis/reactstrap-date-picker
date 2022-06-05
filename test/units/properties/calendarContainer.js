import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getInputWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount
//const calendarContainer= global.calendarContainer

describe('prop calendarContainer', function () {
  this.timeout(500)

  it("should allow placing the popover calendar in a container specified in the props.", () => {
    const did = 'calendar-container'
    
    const Unit = () => 
      <>
        <div id="heyho"></div>
        <DatePicker id={did}
                    calendarContainer={'#heyho'}/>
      </>
    const wrapper= mount(<Unit/>)
  
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // check using document
    const calendar= document.querySelector(`div#heyho`)
    expect(calendar).to.not.equal(null)
    expect(calendar.innerHTML.indexOf('rdp-popover')>=0).to.equal(true)

    // NOTE Dunno if intended/expected, but trough enzyme
    //  wrappers the calendar is always inside th e DatePicker tree
    // const calendarWrapper= wrapper.find('div#heyho')
    // console.log(calendarWrapper.debug())
  
    wrapper.unmount()
  })
})