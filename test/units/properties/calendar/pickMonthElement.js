import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInputWrapper,  getCalendarWrapper} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('props:calendar: pickMonthElement', function () {
  this.timeout(150)


  it("should render custom element pickMonthElement", () => {
    const did = 'calendar-previous-button-element'
    const pickMonthElement = () => <div id="custom-pick-month-element"></div>

    const Unit = () => 
      <DatePicker id={did} 
                  pickMonthElement={pickMonthElement} 
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // get the calendar
    const calendarWrapper= getCalendarWrapper(wrapper)
    
    // check custom button is there
    expect(calendarWrapper.find('#custom-pick-month-element').length).to.equal(1)
    
    wrapper.unmount()
  })

})