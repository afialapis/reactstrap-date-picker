import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getCalendarWrapper,
  getInputWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker properties showTodayButton / todayButtonLabel', function () {
  this.timeout(150)


  it('should render with today button element', () => {
    const did = 'today-button'
    const todayButtonLabel = "Today is the day"
    
    const Unit = () => 
      <DatePicker id={did}
                  showTodayButton={true}
                  todayButtonLabel={todayButtonLabel}
      />

    const wrapper= mount(<Unit/>)

    // focus and open calendar
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')    
    
    // get today button
    const calendarWrapper= getCalendarWrapper(wrapper)
    const todayNode = calendarWrapper.find('button.u-today-button').getDOMNode()

    // check the label
    expect(todayNode.innerHTML).to.equal(todayButtonLabel)
    
    wrapper.unmount()
  })
})