import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInputValue,
  getHiddenInputFmtValue,
  getInput,
  getCalendarRandomDay,
  getCalendarDay,
  getCalendar
}
from '../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global

describe('integrity: calendar', function () {
  this.timeout(5000)
  
  it("should open the calendar and select a date.", () => {
    const did = 'calendar-select'
    const Unit = () => 
      <DatePicker id={did} />

    const {container} = render(<Unit/>)
    
    // check hidden input starts empty
    let hiddenInputValue = getHiddenInputValue(container, did)
    let hiddenInputFmtValue = getHiddenInputFmtValue(container, did)

    expect(hiddenInputValue).to.equal('')
    expect(hiddenInputFmtValue).to.equal('')
    
    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)
    
    // click on some day in the calendar
    const day = getCalendarRandomDay(container)
    fireEvent.click(day)
    
    // check some value has been selected
    hiddenInputValue = getHiddenInputValue(container, did)
    hiddenInputFmtValue = getHiddenInputFmtValue(container, did)

    expect(hiddenInputValue).to.not.equal('')
    expect(hiddenInputFmtValue).to.not.equal('')
    
    
  })
  
  it("should open the calendar, select a date, and trigger a change event.", () => {
    const did = 'calendar-select'

    let value = null;
    let formattedValue = null;

    const Unit = () => 
      <DatePicker id={did} onChange = {(v,f) => {value= v; formattedValue= f}}/>

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // check values are still empty empty
    expect(value).to.equal(null)
    expect(formattedValue).to.equal(null)    
    
    // click on some day in the calendar
    const day = getCalendarRandomDay(container)
    fireEvent.click(day)
    
    // check values are ok after selection
    expect(value).to.exist
    expect(formattedValue).to.exist     
    expect(typeof value).to.equal('string')
    expect(typeof formattedValue).to.equal('string') 
    assertIsoStringsHaveSameDate(value, formattedValue)

    
    
  })

  it("should open the calendar and render 29 days on a leap year.", () => {
    const did = 'calendar-leap-year'
    const value = "2016-02-15T00:00:00.000Z"
    const Unit = () => 
      <DatePicker id={did} value={value} />

    const {container} = render(<Unit/>)

    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)
    
    // get the 29th day element
    const day29container= getCalendarDay(container, 4, 1)
    expect(day29container.innerHTML).to.equal('29')

    // select it and check the value is ok
    fireEvent.click(day29container)

    const hiddenInputValue = getHiddenInputValue(container, did)
    assertIsoStringsHaveSameDate(hiddenInputValue, "2016-02-29T00:00:00.000Z")
    
    
  })

  it("should go to the previous and next month.", () => {
    const did = 'calendar-month-iter'
    const Unit = () => 
      <DatePicker id={did} />

    const {container} = render(<Unit/>)
   
    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // find month switchers
    const previousButtonElement =  container.querySelector(`div.rdp-header-previous-wrapper`)
    const nextButtonElement =  container.querySelector(`div.rdp-header-next-wrapper`)

    // go to previous month
    fireEvent.click(previousButtonElement)

    // select any day in that month and get the value
    const previousDay = getCalendarRandomDay(container)
    fireEvent.click(previousDay)
    const previousMonthISOString = getHiddenInputValue(container, did)

    // reopen calendar
    fireEvent.focus(input)

    // go to next month
    fireEvent.click(nextButtonElement)

    // select any day in that month and get the value
    const nextDay = getCalendarRandomDay(container)
    fireEvent.click(nextDay)
    const currentMonthISOString = getHiddenInputValue(container, did)    

    // check taht previous month' day is actually older
    expect(previousMonthISOString < currentMonthISOString).to.equal(true)
    
    
  })

  it("should cycle through every month in the year.", () => {
    const did = 'calendar-month-year-loop'
    const value = "2016-01-15T00:00:00.000Z"
    const Unit = () => 
      <DatePicker id={did} value={value}/>

    const {container} = render(<Unit/>)
    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

   
    // iter 12 months
    for(let monthIndex = 0; monthIndex < 12; monthIndex++) {
      // on the first loop we are already on the wanted month
      if (monthIndex>0) {
        // open calendar
        fireEvent.focus(input)

        // find month switchers
        const nextButtonElement =  container.querySelector('div.rdp-header-next-wrapper')        
        fireEvent.click(nextButtonElement)
      }
      // select any day in that month and get the value
      const day = getCalendarRandomDay(container)
      fireEvent.click(day)
      const randomMonthISOString = getHiddenInputValue(container, did)

      const randomMonthDate = new Date(randomMonthISOString)
      expect(randomMonthDate.getMonth()).to.equal(monthIndex)
    }
    
    
  })  

  it("should change month and year using default pick month element.", () => {
    const did = 'calendar-month-iter-using-pick-month'
    const value = "2019-07-15T00:00:00.000Z"
    const minDate = "2018-07-15T00:00:00.000Z"
    const maxDate = "2023-07-15T00:00:00.000Z"
    const Unit = () => 
      <DatePicker id={did}
                  value={value}
                  minDate={minDate}
                  maxDate={maxDate}
                  pickMonthElement="default"/>

    const {container} = render(<Unit/>)
   
    // focus on control input, open calendar
    const input = getInput(container)
    fireEvent.focus(input)

    // find month switcher
    const pickMonthElement =  container.querySelector(`div.rdp-header-pick-month-default-month select`)
    
    // go to March
    fireEvent.change(pickMonthElement, { target: { name: 'rdp-header-pick-month-default-month', value: 2 }})
    
    // select any day in that month and get the value
    const previousDay = getCalendarRandomDay(container)
    fireEvent.click(previousDay)
    const some2019MarchISOString = getHiddenInputValue(container, did)
    
    // reopen calendar
    fireEvent.focus(input)
    
    // find year switcher
    const pickYearElement =  container.querySelector(`div.rdp-header-pick-month-default-year select`)

    // go to 2023
    fireEvent.change(pickYearElement, { target: { name: 'rdp-header-pick-month-default-year', value: 2023 }})
    
    // select any day in that month and get the value
    const nextDay = getCalendarRandomDay(container)
    fireEvent.click(nextDay)
    const some2023ISOString = getHiddenInputValue(container, did)    

    // check taht first date is actually older
    expect(some2019MarchISOString < some2023ISOString).to.equal(true)
    
    // check picked dates are alright
    const some2019MarchDate = new Date(some2019MarchISOString)
    const some2023Date = new Date(some2023ISOString)

    expect(some2019MarchDate.getMonth()).to.equal(2)    
    expect(some2019MarchDate.getFullYear()).to.equal(2019)  

    expect(some2023Date.getMonth()).to.equal(2)    
    expect(some2023Date.getFullYear()).to.equal(2023)    

    
  })

  it("should display the correct day of the week in the calendar.", () => {

    const did = 'calndar-integrity-one'
    const Unit = () => 
        <DatePicker id={did}
                    dateFormat="MM/DD/YYYY"
                    />

    const {container} = render(<Unit/>)

    const input= getInput(container)

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

            expect(date.getDay()).to.equal(dayIdx)
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