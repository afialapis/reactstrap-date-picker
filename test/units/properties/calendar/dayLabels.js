import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInputWrapper,  getCalendarWrapper} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('props:calendar: dayLabels', function () {
  this.timeout(300)

  it("should render custom day labels", (done) => {
    //this.timeout(300)

    const did = 'calendar-day-labels'
    const valueDate = new Date('2011-10-05T14:48:00.000Z')
    const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab']
    
    const Unit = () => 
      <DatePicker id={did} 
                  value={valueDate.toISOString()}
                  dayLabels={spanishDayLabels}
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // get the calendar
    const calendarWrapper= getCalendarWrapper(wrapper)
    
    // check the day titles
    const dayTitles= calendarWrapper.find('table thead tr').at(0).find('td small')
    
    dayTitles.forEach( (dayWrap, dayIdx) => {
      expect(dayWrap.getDOMNode().innerHTML).to.equal(spanishDayLabels[dayIdx])
    })
    
    wrapper.unmount()

    done()
  })

})
