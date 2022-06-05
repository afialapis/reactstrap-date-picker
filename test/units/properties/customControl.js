import React from 'react'
import {DatePicker} from '../../../src/index'

const expect= global.expect
const mount= global.mount

describe('prop customControl', function () {
  this.timeout(100)
  
  it('should render a custom button element', () => {
    const did = 'custom-control'
    
    const Unit = () => 
      <DatePicker id={did}
                  customControl={<button id="test-btn">Test button</button>}
      />

    const wrapper= mount(<Unit/>)
    
    const customControlWrapper = wrapper.find('button#test-btn')
    const customControlNode = customControlWrapper.getDOMNode()
    
    expect(customControlWrapper.length).to.equal(1)
    expect(customControlNode.innerHTML).to.equal('Test button')

    wrapper.unmount()
  })
})