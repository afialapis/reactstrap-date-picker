import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getHiddenInputValue,
  getInputWrapper,
  getInputNode,
  getCalendarWrapper,
  getCalendarDayHeaderWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('prop weekStartsOn', function () {
  //this.timeout(10000)
  this.timeout(3000)

  it("week should start on Monday.", () => {
    const did = 'week-starts-monday'
    
    const Unit = () => 
      <DatePicker id={did}
      weekStartsOn={1}
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // get the first day header in the calendar
    const firstDayWrapper = getCalendarDayHeaderWrapper(wrapper, 0)
    
    expect(firstDayWrapper.find('small').getDOMNode().innerHTML).to.equal('Mon')

    wrapper.unmount()
  })

  it("week should start on Thursday.", () => {
    const did = 'week-starts-thursday'
    
    const Unit = () => 
      <DatePicker id={did}
                  weekStartsOn={4}
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // get the first day header in the calendar
    const firstDayWrapper = getCalendarDayHeaderWrapper(wrapper, 0)
    
    expect(firstDayWrapper.find('small').getDOMNode().innerHTML).to.equal('Thu')

    wrapper.unmount()
  })

  it("week should start on Saturday.", () => {
    const did = 'week-starts-saturday'
    
    const Unit = () => 
      <DatePicker id={did}
                  weekStartsOn={6}
      />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // get the first day header in the calendar
    const firstDayWrapper = getCalendarDayHeaderWrapper(wrapper, 0)
    
    expect(firstDayWrapper.find('small').getDOMNode().innerHTML).to.equal('Sat')

    wrapper.unmount()
  })

  it("should display the correct day of the week in the calendar when starting on Monday.", () => {
    const did = 'correct-week-day'

    let _value = null;
    let _formattedValue = null;

    const Unit = () => 
      <DatePicker id={did} 
                  onChange = {(v,f) => {_value= v; _formattedValue= f}}
                  dateFormat="MM/DD/YYYY" 
                  weekStartsOn={1}
                  />

    const wrapper= mount(<Unit/>)
    
    // get some wrappers
    const inputWrapper = getInputWrapper(wrapper)
    const inputNode = getInputNode(wrapper)
    
    const checkMonthAndYear = function(startValue) {

      inputNode.value = `${startValue.slice(5,7)}/${startValue.slice(8,10)}/${startValue.slice(0,4)}`
      inputWrapper.simulate('change')
      inputWrapper.simulate('focus')

      const calendar = getCalendarWrapper(wrapper)

      const weekWrappers = calendar.find("table tbody tr")
      
      weekWrappers.forEach( (weekWrapper, _weekIdx) => {
        const dayWrappers= weekWrapper.find('td')

        dayWrappers.forEach( (dayWrapper, dayIdx) => {
          const dayNode= dayWrapper.getDOMNode()
          const dayText = dayNode.innerHTML

          if (dayText !== '') {
            
            dayWrapper.simulate('click')

            const hiddenInputValue = getHiddenInputValue(wrapper, did)
            let date = new Date(hiddenInputValue)

            const dayN= dayIdx === 6 ? 0 : dayIdx + 1
            expect(date.getDay()).to.equal(dayN)
          }
        })
      })
    }
     
    // const check5Years = () => {
    //   const today = new Date()
    //   for(let year = today.getFullYear() - 2; year < today.getFullYear() + 2; year++) {
    //     for(let month = 0; month < 12; month++) {
    //       const date = new Date()
    //       date.setMonth(month)
    //       date.setYear(year)
    //       checkMonthAndYear(date.toISOString())
    //     }
    //   }
    // }

    const checkSeveralDates = () => {
      checkMonthAndYear('2011-12-01T12:00:00.000Z')
      checkMonthAndYear('2012-11-02T12:00:00.000Z')
      checkMonthAndYear('2013-10-03T12:00:00.000Z')
      checkMonthAndYear('2014-09-04T12:00:00.000Z')
      checkMonthAndYear('2015-08-05T12:00:00.000Z')
      checkMonthAndYear('2016-07-06T12:00:00.000Z')
      checkMonthAndYear('2017-06-07T12:00:00.000Z')
      checkMonthAndYear('2018-05-08T12:00:00.000Z')
      checkMonthAndYear('2019-04-09T12:00:00.000Z')
      checkMonthAndYear('2020-03-10T12:00:00.000Z')
      checkMonthAndYear('2021-02-11T12:00:00.000Z')
      checkMonthAndYear('2022-01-12T12:00:00.000Z')
    }

    //check5Years()
    checkSeveralDates()
    
    wrapper.unmount()
  })
})