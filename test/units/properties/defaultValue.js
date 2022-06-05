import React from 'react'
import {DatePicker} from '../../../src/DatePicker'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInputValue,
  getInputWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('prop defaultValue', function () {
  this.timeout(100)


  it("should set a default value", () => {
    const did = 'default-value-one'
    const defaultValue = `2022-05-31T12:00:00.000Z`
    let value = null;
    
    const Unit = () => 
        <DatePicker id={did}
                    defaultValue={defaultValue}
                    onChange= {(v, _f) => value= v}
                    />

    const wrapper= mount(<Unit/>)
    
    assertIsoStringsHaveSameDate(getHiddenInputValue(wrapper, did), defaultValue)

    expect(value).to.equal(null)

    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('change')

    expect(value).to.not.equal(null)
    expect(value).to.equal(defaultValue) // sure?

    wrapper.unmount()
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