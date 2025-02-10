import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getHiddenInputValue,
  getInput,
  getCalendar,
  getCalendarDayHeader
} from '../../../tools/finders'


const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: weekStartsOn', function () {
  //// this.timeout(10000)
  this.timeout(3000)

  it("week should start on Monday.", () => {
    const did = 'week-starts-monday'
    
    const Unit = () => 
      <DatePicker id={did}
         weekStartsOn={1}
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)
    
    // get the first day header in the calendar
    const firstDay = getCalendarDayHeader(container, 0) 
    expect(firstDay.querySelector('small').innerHTML).to.equal('Mon')
  })

  it("week should start on Thursday.", () => {
    const did = 'week-starts-thursday'
    
    const Unit = () => 
      <DatePicker id={did}
                  weekStartsOn={4}
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)
    
    // get the first day header in the calendar
    const firstDay = getCalendarDayHeader(container, 0)
    
    expect(firstDay.querySelector('small').innerHTML).to.equal('Thu')

    
  })

  it("week should start on Saturday.", () => {
    const did = 'week-starts-saturday'
    
    const Unit = () => 
      <DatePicker id={did}
                  weekStartsOn={6}
      />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)
    
    // get the first day header in the calendar
    const firstDay = getCalendarDayHeader(container, 0)
    
    expect(firstDay.querySelector('small').innerHTML).to.equal('Sat')

    
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

    const {container} = render(<Unit/>)
    
    // get some s
    const input = getInput(container)
    
    const checkMonthAndYear = function(startValue) {

      fireEvent.change(input, {target: {value: `${startValue.slice(5,7)}/${startValue.slice(8,10)}/${startValue.slice(0,4)}`}})
      fireEvent.focus(input)

      const calendar = getCalendar(container)

      const weeks = calendar.querySelectorAll("table tbody tr")
      
      weeks.forEach( (week, _weekIdx) => {
        const days= week.querySelectorAll('td')

        days.forEach( (day, dayIdx) => {
          const dayText = day.innerHTML

          if (dayText !== '') {
            
            fireEvent.click(day)

            const hiddenInputValue = getHiddenInputValue(container, did)
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
    
    
  })
})