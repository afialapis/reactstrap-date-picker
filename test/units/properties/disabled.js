import React from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getInputNode
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('prop disabled', function () {
  this.timeout(100)

  it("should disable the input.", () => {
    const did = 'disabled-one'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  disabled={true}
      />

    const wrapper= mount(<Unit/>)
    
    const inputNode= getInputNode(wrapper)
    expect(inputNode.disabled).to.equal(true)
    
    wrapper.unmount()
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

    const wrapper= mount(<Unit/>)
    
    const inputNode= getInputNode(wrapper)
    expect(inputNode.disabled).to.equal(true)

    const clearButtonWrapper = wrapper.find("span.input-group-text")
    clearButtonWrapper.simulate('click')

    assertIsoStringsHaveSameDate(valueDate, originalValue)
    
    wrapper.unmount()
  })
})