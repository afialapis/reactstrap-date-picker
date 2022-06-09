import React from 'react'
import {DatePicker} from '../../../../src/index'

import {getInputWrapper,  getCalendarWrapper} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('props:calendar: monthLabels', function () {
  this.timeout(150)


  it("should render custom month labels", () => {
    const did = 'calendar-previous-button-element'
    const valueDate = new Date('2011-10-05T14:48:00.000Z')
    const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
                                'Junio', 'Julio', 'Agosto', 'Septiembre',
                                'Octubre', 'Noviembre', 'Diciembre']
    
    const Unit = () => 
      <DatePicker id={did} 
                  value={valueDate.toISOString()}
                  monthLabels={spanishMonthLabels}
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // get the calendar
    const calendarWrapper= getCalendarWrapper(wrapper)
    
    // check the month title
    const currentMonthLabel = spanishMonthLabels[valueDate.getMonth()]
    const calendarTitle = calendarWrapper.find('div.rdp-header span').getDOMNode().innerHTML
    expect(calendarTitle.indexOf(currentMonthLabel)>=0).to.equal(true)
    
    wrapper.unmount()
  })

})