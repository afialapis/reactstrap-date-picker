import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInputWrapper,  getCalendarWrapper} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('props:calendar: nextButtonElement', function () {
  this.timeout(150)


  it("should render custom element nextButtonElement", () => {
    const did = 'calendar-next-button-element'
    const nextButtonElement = <div id="custom-next-button-element"></div>

    const Unit = () => 
      <DatePicker id={did} 
                  nextButtonElement={nextButtonElement} 
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // get the calendar
    const calendarWrapper= getCalendarWrapper(wrapper)
    
    // check custom button is there
    expect(calendarWrapper.find('#custom-next-button-element').length).to.equal(1)
    
    wrapper.unmount()
  })

})