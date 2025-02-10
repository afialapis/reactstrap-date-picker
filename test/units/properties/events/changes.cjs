import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput,
  getCalendarRandomDay
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:events: changes', function () {
  // this.timeout(500)

  it("should update via a change handler when the input is changed.", () => {
    const did = 'changes-one'
    let value = null;
    let formattedValue = null;

    const Unit = () => 
        <DatePicker id={did}
                    onChange={(v,f) => {value= v; formattedValue= f}} 
                    dateFormat="MM/DD/YYYY"
                    />

    const {container} = render(<Unit/>)
    
    const input= getInput(container)
    
    fireEvent.change(input, {target: {value: "05/31/1980"}})

    const date = new Date(value)
    expect(date.getMonth()   ).to.equal(4)
    expect(date.getDate()    ).to.equal(31)
    expect(date.getFullYear()).to.equal(1980)
    expect(formattedValue    ).to.equal("05/31/1980")
  })

  it("should update via a change handler when cleared.", () => {
    const did = 'changes-two'
    let value = null;
    let formattedValue = null;

    const Unit = () => 
        <DatePicker id={did}
                    onChange={(v,f) => {value= v; formattedValue= f}} 
                    dateFormat="MM/DD/YYYY"
                    />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    fireEvent.focus(input)

    const clearButton = container.querySelector("span.input-group-text")
    const day= getCalendarRandomDay(container)

    fireEvent.click(day)
    expect(value         ).to.exist
    expect(formattedValue).to.exist

    fireEvent.click(clearButton)
    expect(value         ).to.equal(null)
    expect(formattedValue).to.equal(null)
    
    
  })
})