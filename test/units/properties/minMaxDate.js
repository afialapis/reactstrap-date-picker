
import React, {useState} from 'react'
import {DatePicker} from '../../../src/index'

import {
  getHiddenInputValue,
  getInputWrapper,
  getCalendarDayWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker properties minDate / maxDate', function () {
  this.timeout(150)

  it("should disable dates outside of min and max dates.", () => {
    const did = 'min-max-dates-one'
    const originalValue = "2016-09-15T12:00:00.000Z"
    const minDate = "2016-09-12T00:00:00.000Z"
    const maxDate = "2016-09-18T00:00:00.000Z"
    const justRightValue = "2016-09-12T12:00:00.000Z"
    
    const Unit = () => {
      const [value, setValue]= useState(originalValue)
      return (
        <DatePicker id={did}
                    value= {value}
                    onChange= {(v,_f) => setValue(v)}
                    minDate={minDate} 
                    maxDate={maxDate} 
                    />
        )
      }

    const wrapper= mount(<Unit/>)
    

    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    const tooEarlyDayWrapper = getCalendarDayWrapper(wrapper, 1, 1)
    const justRightDayWrapper = getCalendarDayWrapper(wrapper, 2, 1)
    const tooLateDayWrapper = getCalendarDayWrapper(wrapper, 3, 1)

    const tooEarlyDayNode = tooEarlyDayWrapper.getDOMNode()
    const justRightDayNode = justRightDayWrapper.getDOMNode()
    const tooLateDayNode = tooLateDayWrapper.getDOMNode()
    expect(tooEarlyDayNode.classList.contains('text-muted')).to.equal(true)
    expect(justRightDayNode.classList.contains('text-muted')).to.equal(false)
    expect(tooLateDayNode.classList.contains('text-muted')).to.equal(true)
    

    expect(getHiddenInputValue(wrapper, did)).to.equal(originalValue)

    tooEarlyDayWrapper.simulate('click')
    expect(getHiddenInputValue(wrapper, did)).to.equal(originalValue)

    justRightDayWrapper.simulate('click')
    expect(getHiddenInputValue(wrapper, did)).to.equal(justRightValue)
 
    tooLateDayWrapper.simulate('click')
    expect(getHiddenInputValue(wrapper, did)).to.equal(justRightValue)
    
    
    wrapper.unmount()
  })

  it("should show next and prev buttons if min and max dates are not set.", () => {
    const did = 'min-max-dates-two'
    const displayDate = "2017-07-21T12:00:00.000Z"
    
    const Unit = () => {
      const [value, setValue]= useState(displayDate)
      return (
        <DatePicker id={did}
                    value= {value}
                    onChange= {(v,_f) => setValue(v)}
                    />
        )
      }

    const wrapper= mount(<Unit/>)
    
    // focus
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // check buttons
    const prevButtonNode = wrapper.find("div.rdp-header-previous-wrapper").getDOMNode()
    const nextButtonNode = wrapper.find("div.rdp-header-next-wrapper").getDOMNode()

    expect(prevButtonNode.innerHTML).to.equal('&lt;')
    expect(nextButtonNode.innerHTML).to.equal('&gt;')
    
    wrapper.unmount()
  })


  it("should not show next and prev buttons if min and max dates are set and limit to current month.", () => {
    const did = 'min-max-dates-three'
    const displayDate = "2017-07-21T12:00:00.000Z"
    const minDate = "2017-07-01T12:00:00.000Z"
    const maxDate = "2017-07-31T12:00:00.000Z"
    
    const Unit = () => {
      const [value, setValue]= useState(displayDate)
      return (
        <DatePicker id={did}
                    value= {value}
                    onChange= {(v,_f) => setValue(v)}
                    minDate={minDate} 
                    maxDate={maxDate} 
                    />
        )
      }

    const wrapper= mount(<Unit/>)
    
    // focus
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // check buttons
    const prevButtonNode = wrapper.find("div.rdp-header-previous-wrapper").getDOMNode()
    const nextButtonNode = wrapper.find("div.rdp-header-next-wrapper").getDOMNode()

    expect(prevButtonNode.innerHTML).to.equal('')
    expect(nextButtonNode.innerHTML).to.equal('')
    
    wrapper.unmount()
  })


  it("should hide previousButtonElement if min date is set and being displayed.", () => {
    const did = 'min-max-dates-four'
    const displayDate = "2017-07-21T12:00:00.000Z"
    const minDate = "2017-07-01T12:00:00.000Z"
    const maxDate = "2017-12-31T12:00:00.000Z"
    
    const Unit = () => {
      const [value, setValue]= useState(displayDate)
      return (
        <DatePicker id={did}
                    value= {value}
                    onChange= {(v,_f) => setValue(v)}
                    minDate={minDate} 
                    maxDate={maxDate} 
                    />
        )
      }

    const wrapper= mount(<Unit/>)
    
    // focus
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // check buttons
    const prevButtonNode = wrapper.find("div.rdp-header-previous-wrapper").getDOMNode()
    const nextButtonNode = wrapper.find("div.rdp-header-next-wrapper").getDOMNode()

    expect(prevButtonNode.innerHTML).to.equal('')
    expect(nextButtonNode.innerHTML).to.equal('&gt;')
    
    wrapper.unmount()
  })


  it("should hide nextButtonElement if max date is set and being displayed.", () => {
    const did = 'min-max-dates-five'
    const displayDate = "2017-07-21T12:00:00.000Z"
    const minDate = "2017-01-01T12:00:00.000Z"
    const maxDate = "2017-07-31T12:00:00.000Z"
    
    const Unit = () => {
      const [value, setValue]= useState(displayDate)
      return (
        <DatePicker id={did}
                    value= {value}
                    onChange= {(v,_f) => setValue(v)}
                    minDate={minDate} 
                    maxDate={maxDate} 
                    />
        )
      }

    const wrapper= mount(<Unit/>)
    
    // focus
    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    // check buttons
    const prevButtonNode = wrapper.find("div.rdp-header-previous-wrapper").getDOMNode()
    const nextButtonNode = wrapper.find("div.rdp-header-next-wrapper").getDOMNode()

    expect(prevButtonNode.innerHTML).to.equal('&lt;')
    expect(nextButtonNode.innerHTML).to.equal('')
    
    wrapper.unmount()
  })
})