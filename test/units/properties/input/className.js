import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInputNode
} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('props:input: className', function () {
  this.timeout(100)


  it("should set the FormControl className.", () => {
    const did = 'className'
    const className= 'custom-rdp-classname'
    
    const Unit = () => 
      <DatePicker id={did}
                  className={className}
      />

    const wrapper= mount(<Unit/>)

    const inputNode= getInputNode(wrapper)
    expect(inputNode.className.indexOf(className)).to.above(0)
    expect(wrapper.find(`input.${className}`).length).to.equal(1)
    
    wrapper.unmount()
  })
})