import React from 'react'
import {DatePicker} from '../../../src/index'
import {
  getInputWrapper,
  getInputNode
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount

describe('integrity: typing', function () {
  this.timeout(100)

  it('should trim extra characters.', () => {
    const did = 'typing-one'
    const Unit = () => 
        <DatePicker id={did}
                    />

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    const inputNode = getInputNode(wrapper)

    inputNode.value = "05/31/1980 extra"
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal("05/31/1980")
    
    wrapper.unmount()
  })


  it("should automatically insert slashes.", () => {
    const did = 'typing-two'
    const Unit = () => 
        <DatePicker id={did}
                    />

    const wrapper= mount(<Unit/>)
    
    const inputWrapper= getInputWrapper(wrapper)
    const inputNode = getInputNode(wrapper)

    inputNode.value = "05/31/1980 extra"
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal("05/31/1980")
    
    inputNode.value = "0"
    inputWrapper.simulate('change')
    inputNode.value = "053"
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal("05/3")
    inputNode.value = "05/311"
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal("05/31/1")
    
    wrapper.unmount()
  })
})