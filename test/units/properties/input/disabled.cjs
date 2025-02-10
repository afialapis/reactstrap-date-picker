import React from 'react'
import {DatePicker} from '../../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../../tools/checks'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global

describe('props:input: disabled', function () {
  // this.timeout(100)

  it("should disable the input.", () => {
    const did = 'disabled-one'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  disabled={true}
      />

    const {container} = render(<Unit/>)
    
    const input= getInput(container)
    expect(input.disabled).to.equal(true)
    
    
  })

  it("should disable the input and ensure clear button is not clickable.", () => {
    const did = 'disabled-two'
    let valueDate= new Date('2011-10-05T14:48:00.000Z')
    const originalValue= valueDate.toISOString()
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  disabled={true}
                  onChange= {(v,_f) => valueDate = v}
      />

    const {container} = render(<Unit/>)
    
    const input= getInput(container)
    expect(input.disabled).to.equal(true)

    const clearButton = container.querySelector("span.input-group-text")
    fireEvent.click(clearButton)

    assertIsoStringsHaveSameDate(valueDate, originalValue)
    
    
  })
})