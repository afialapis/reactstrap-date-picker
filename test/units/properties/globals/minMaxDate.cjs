
import React, {useState} from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getHiddenInputValue,
  getInput,
  getCalendarDay
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:globals: minDate / maxDate', function () {
  // this.timeout(150)

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

    const {container} = render(<Unit/>)
    

    const input= getInput(container)
    fireEvent.focus(input)

    const tooEarlyDay = getCalendarDay(container, 1, 1)
    const justRightDay = getCalendarDay(container, 2, 1)
    const tooLateDay = getCalendarDay(container, 3, 1)

    expect(tooEarlyDay.classList.contains('text-muted')).to.equal(true)
    expect(justRightDay.classList.contains('text-muted')).to.equal(false)
    expect(tooLateDay.classList.contains('text-muted')).to.equal(true)
    

    expect(getHiddenInputValue(container, did)).to.equal(originalValue)

    fireEvent.click(tooEarlyDay)
    expect(getHiddenInputValue(container, did)).to.equal(originalValue)

    fireEvent.click(justRightDay)
    expect(getHiddenInputValue(container, did)).to.equal(justRightValue)
 
    fireEvent.click(tooLateDay)
    expect(getHiddenInputValue(container, did)).to.equal(justRightValue)
    
    
    
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

    const {container} = render(<Unit/>)
    
    // focus
    const input= getInput(container)
    fireEvent.focus(input)

    // check buttons
    const prevButton = container.querySelector("div.rdp-header-previous-wrapper")
    const nextButton = container.querySelector("div.rdp-header-next-wrapper")

    expect(prevButton.innerHTML).to.equal('&lt;')
    expect(nextButton.innerHTML).to.equal('&gt;')
    
    
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

    const {container} = render(<Unit/>)
    
    // focus
    const input= getInput(container)
    fireEvent.focus(input)

    // check buttons
    const prevButton = container.querySelector("div.rdp-header-previous-wrapper")
    const nextButton = container.querySelector("div.rdp-header-next-wrapper")

    expect(prevButton.innerHTML).to.equal('')
    expect(nextButton.innerHTML).to.equal('')
    
    
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

    const {container} = render(<Unit/>)
    
    // focus
    const input= getInput(container)
    fireEvent.focus(input)

    // check buttons
    const prevButton = container.querySelector("div.rdp-header-previous-wrapper")
    const nextButton = container.querySelector("div.rdp-header-next-wrapper")

    expect(prevButton.innerHTML).to.equal('')
    expect(nextButton.innerHTML).to.equal('&gt;')
    
    
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

    const {container} = render(<Unit/>)
    
    // focus
    const input= getInput(container)
    fireEvent.focus(input)

    // check buttons
    const prevButton = container.querySelector("div.rdp-header-previous-wrapper")
    const nextButton = container.querySelector("div.rdp-header-next-wrapper")

    expect(prevButton.innerHTML).to.equal('&lt;')
    expect(nextButton.innerHTML).to.equal('')
    
    
  })
})