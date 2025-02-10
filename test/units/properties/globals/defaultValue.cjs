import React from 'react'
import {DatePicker} from '../../../../src/DatePicker'
import {assertIsoStringsHaveSameDate} from '../../../tools/checks'

import {
  getHiddenInputValue,
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global

describe('props:globals: defaultValue', function () {
  // this.timeout(100)


  it("should set a default value", () => {
    const did = 'default-value-one'
    const defaultValue = `2022-05-31T12:00:00.000Z`
    const defaultValueFmt = `31/05/2022`
    
    const Unit = () => 
        <DatePicker id={did}
                    defaultValue={defaultValue}
                    dateFormat='DD/MM/YYYY'
                    />

    const {container} = render(<Unit/>)
    const input = getInput(container)
    
    assertIsoStringsHaveSameDate(getHiddenInputValue(container, did), defaultValue)
    expect(input.value).to.equal(defaultValueFmt)
    
    fireEvent.change(input)

    assertIsoStringsHaveSameDate(getHiddenInputValue(container, did), defaultValue)
    expect(input.value).to.equal(defaultValueFmt)
    
  })

  
  it("should error if value and default value are both set.", () => {
    const did = 'default-value-two'
    const value = `2022-05-31T12:00:00.000Z`
    
    let errorProduced= false
    try {
      // since we use forwardRef, we have the .render() method available
      DatePicker.render({id: did, defaultValue: value, value: value })
    } catch(e) {
      errorProduced= true
      expect(e.message).to.equal("Conflicting DatePicker properties 'value' and 'defaultValue'")
    }

    expect(errorProduced).to.equal(true)
  })

})