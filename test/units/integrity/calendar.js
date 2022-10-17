import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInputValue,
  getHiddenInputFmtValue,
  getInputWrapper,
  getCalendarRandomDayWrapper,
  getCalendarDayWrapper,
  getInputNode,
  getCalendarWrapper
}
from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('integrity: calendar', function () {
  this.timeout(5000)
  
  it("should open the calendar and select a date.", () => {
    const did = 'calendar-select'
    const Unit = () => 
      <DatePicker id={did} />

    const wrapper= mount(<Unit/>)
    
    // check hidden input starts empty
    let hiddenInputValue = getHiddenInputValue(wrapper, did)
    let hiddenInputFmtValue = getHiddenInputFmtValue(wrapper, did)

    expect(hiddenInputValue).to.equal('')
    expect(hiddenInputFmtValue).to.equal('')
    
    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // click on some day in the calendar
    const dayWrapper = getCalendarRandomDayWrapper(wrapper)
    dayWrapper.simulate('click')
    
    // check some value has been selected
    hiddenInputValue = getHiddenInputValue(wrapper, did)
    hiddenInputFmtValue = getHiddenInputFmtValue(wrapper, did)

    expect(hiddenInputValue).to.not.equal('')
    expect(hiddenInputFmtValue).to.not.equal('')
    
    wrapper.unmount()
  })
  
  it("should open the calendar, select a date, and trigger a change event.", () => {
    const did = 'calendar-select'

    let value = null;
    let formattedValue = null;

    const Unit = () => 
      <DatePicker id={did} onChange = {(v,f) => {value= v; formattedValue= f}}/>

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // check values are still empty empty
    expect(value).to.equal(null)
    expect(formattedValue).to.equal(null)    
    
    // click on some day in the calendar
    const dayWrapper = getCalendarRandomDayWrapper(wrapper)
    dayWrapper.simulate('click')
    
    // check values are ok after selection
    expect(value).to.not.equal(null)
    expect(formattedValue).to.not.equal(null)     
    expect(typeof value).to.equal('string')
    expect(typeof formattedValue).to.equal('string') 
    assertIsoStringsHaveSameDate(value, formattedValue)

    
    wrapper.unmount()
  })

  it("should open the calendar and render 29 days on a leap year.", () => {
    const did = 'calendar-leap-year'
    const value = "2016-02-15T00:00:00.000Z"
    const Unit = () => 
      <DatePicker id={did} value={value} />

    const wrapper= mount(<Unit/>)

    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')
    
    // get the 29th day element
    const day29Wrapper= getCalendarDayWrapper(wrapper, 4, 1)
    expect(day29Wrapper.getDOMNode().innerHTML).to.equal('29')

    // select it and check the value is ok
    day29Wrapper.simulate('click')

    const hiddenInputValue = getHiddenInputValue(wrapper, did)
    assertIsoStringsHaveSameDate(hiddenInputValue, "2016-02-29T00:00:00.000Z")
    
    wrapper.unmount()
  })

  it("should go to the previous and next month.", () => {
    const did = 'calendar-month-iter'
    const Unit = () => 
      <DatePicker id={did} />

    const wrapper= mount(<Unit/>)
   
    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // find month switchers
    const previousButtonElement =  wrapper.find(`div.rdp-header-previous-wrapper`)
    const nextButtonElement =  wrapper.find(`div.rdp-header-next-wrapper`)

    // go to previous month
    previousButtonElement.simulate('click')

    // select any day in that month and get the value
    const previousDay = getCalendarRandomDayWrapper(wrapper)
    previousDay.simulate('click')
    const previousMonthISOString = getHiddenInputValue(wrapper, did)

    // reopen calendar
    inputWrapper.simulate('focus')

    // go to next month
    nextButtonElement.simulate('click')

    // select any day in that month and get the value
    const nextDay = getCalendarRandomDayWrapper(wrapper)
    nextDay.simulate('click')
    const currentMonthISOString = getHiddenInputValue(wrapper, did)    

    // check taht previous month' day is actually older
    expect(previousMonthISOString < currentMonthISOString).to.equal(true)
    
    wrapper.unmount()
  })

  it("should cycle through every month in the year.", () => {
    const did = 'calendar-month-year-loop'
    const value = "2016-01-15T00:00:00.000Z"
    const Unit = () => 
      <DatePicker id={did} value={value}/>

    const wrapper= mount(<Unit/>)
    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

   
    // iter 12 months
    for(let monthIndex = 0; monthIndex < 12; monthIndex++) {
      // on the first loop we are already on the wanted month
      if (monthIndex>0) {
        // open calendar
        inputWrapper.simulate('focus')

        // find month switchers
        const nextButtonElement =  wrapper.find('div.rdp-header-next-wrapper')        
        nextButtonElement.simulate('click')
      }
      // select any day in that month and get the value
      const dayWrapper = getCalendarRandomDayWrapper(wrapper)
      dayWrapper.simulate('click')
      const randomMonthISOString = getHiddenInputValue(wrapper, did)

      const randomMonthDate = new Date(randomMonthISOString)
      expect(randomMonthDate.getMonth()).to.equal(monthIndex)
    }
    
    wrapper.unmount()
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

    const wrapper= mount(<Unit/>)
   
    // focus on control input, open calendar
    const inputWrapper = getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // find month switcher
    const pickMonthElement =  wrapper.find(`div.rdp-header-pick-month-default-month select`)
    
    // go to March
    pickMonthElement.simulate('change', { target: { name: 'rdp-header-pick-month-default-month', value: 2 }})
    
    // select any day in that month and get the value
    const previousDay = getCalendarRandomDayWrapper(wrapper)
    previousDay.simulate('click')
    const some2019MarchISOString = getHiddenInputValue(wrapper, did)
    
    // reopen calendar
    inputWrapper.simulate('focus')
    
    // find year switcher
    const pickYearElement =  wrapper.find(`div.rdp-header-pick-month-default-year select`)

    // go to 2023
    pickYearElement.simulate('change', { target: { name: 'rdp-header-pick-month-default-year', value: 2023 }})
    
    // select any day in that month and get the value
    const nextDay = getCalendarRandomDayWrapper(wrapper)
    nextDay.simulate('click')
    const some2023ISOString = getHiddenInputValue(wrapper, did)    

    // check taht first date is actually older
    expect(some2019MarchISOString < some2023ISOString).to.equal(true)
    
    // check picked dates are alright
    const some2019MarchDate = new Date(some2019MarchISOString)
    const some2023Date = new Date(some2023ISOString)

    expect(some2019MarchDate.getMonth()).to.equal(2)    
    expect(some2019MarchDate.getFullYear()).to.equal(2019)  

    expect(some2023Date.getMonth()).to.equal(2)    
    expect(some2023Date.getFullYear()).to.equal(2023)    

    wrapper.unmount()
  })

  it("should display the correct day of the week in the calendar.", () => {

    const did = 'calndar-integrity-one'
    const Unit = () => 
        <DatePicker id={did}
                    dateFormat="MM/DD/YYYY"
                    />

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    const inputNode= getInputNode(wrapper)

    const checkMonthAndYear = function(startValue) {
      inputNode.value= `${startValue.slice(5,7)}/${startValue.slice(8,10)}/${startValue.slice(0,4)}`
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
    
    wrapper.unmount()
  })  
})