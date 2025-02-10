import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getHiddenInput,
  getHiddenInputValue,
  getHiddenInputFmtValue
} from '../../tools/finders'

const expect= global.expect
const render= global.render


describe('integrity: basic', function () {
  // this.timeout(100)


  it('should render a date picker', () => {
    const did= 'basic'
    const {container} = render(<DatePicker id={did} />)

    // check the hidden input is actually there
    const hiddenInput= getHiddenInput(container, did)
    expect(hiddenInput).to.exist

  })

  
  it("should render a date picker with a value.", () => {
    const did = 'basic-with-value'
    const value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`
    const Unit = () => 
      <DatePicker id={did} value={value} />

    const {container} = render(<Unit/>)

    // get both hidden and shown values 
    const hiddenInputValue = getHiddenInputValue(container, did)
    const hiddenInputFmtValue = getHiddenInputFmtValue(container, did)

    // check they are the same
    assertIsoStringsHaveSameDate(hiddenInputValue, hiddenInputFmtValue)
    expect(hiddenInputFmtValue)
      .to.equal(`${value.slice(5,7)}/${value.slice(8,10)}/${value.slice(0,4)}`)
  })


})