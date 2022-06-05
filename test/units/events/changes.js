import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getInputWrapper,
  getInputNode,
  getCalendarRandomDayWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker basics', function () {
  this.timeout(500)

  it("should update via a change handler when the input is changed.", () => {
    const did = 'changes-one'
    let value = null;
    let formattedValue = null;

    const Unit = () => 
        <DatePicker id={did}
                    onChange={(v,f) => {value= v; formattedValue= f}} 
                    dateFormat="MM/DD/YYYY"
                    />

    const wrapper= mount(<Unit/>)
    
    const inputWrapper= getInputWrapper(wrapper)
    const inputNode = getInputNode(wrapper)

    inputNode.value = "05/31/1980"
    inputWrapper.simulate('change')

    const date = new Date(value)
    expect(date.getMonth()   ).to.equal(4)
    expect(date.getDate()    ).to.equal(31)
    expect(date.getFullYear()).to.equal(1980)
    expect(formattedValue    ).to.equal("05/31/1980")
    
    wrapper.unmount()
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

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    inputWrapper.simulate('focus')

    const clearButtonWrapper = wrapper.find("span.input-group-text")
    const dayWrapper= getCalendarRandomDayWrapper(wrapper)

    dayWrapper.simulate('click')
    expect(value         ).to.not.equal(null)
    expect(formattedValue).to.not.equal(null)

    clearButtonWrapper.simulate('click')
    expect(value         ).to.equal(null)
    expect(formattedValue).to.equal(null)
    
    wrapper.unmount()
  })
})