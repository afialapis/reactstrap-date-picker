import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInputWrapper,
  getHiddenInputValue,
  getHiddenInputFmtValue
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('integrity: basic', function () {
  this.timeout(100)


  it('should render a date picker', () => {
    const did= 'basic'
    const wrapper= mount(<DatePicker id={did} />)

    // check the hidden input is actually there
    const hiddenWrapper= getHiddenInputWrapper(wrapper, did)
    expect(hiddenWrapper.length).to.equal(1)

    wrapper.unmount()
  })

  
  it("should render a date picker with a value.", () => {
    const did = 'basic-with-value'
    const value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`
    const Unit = () => 
      <DatePicker id={did} value={value} />

    const wrapper= mount(<Unit/>)

    // get both hidden and shown values 
    const hiddenInputValue = getHiddenInputValue(wrapper, did)
    const hiddenInputFmtValue = getHiddenInputFmtValue(wrapper, did)

    // check they are the same
    assertIsoStringsHaveSameDate(hiddenInputValue, hiddenInputFmtValue)
    expect(hiddenInputFmtValue)
      .to.equal(`${value.slice(5,7)}/${value.slice(8,10)}/${value.slice(0,4)}`)

    wrapper.unmount()
  })


})