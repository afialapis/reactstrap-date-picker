import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInputValue,
  getHiddenInputFmtValue,
  getInputWrapper,
  getCalendarRandomDayWrapper,
  getCalendarDayWrapper}
from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker calendar events', function () {
  this.timeout(1000)
  
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

})