import React from 'react'
import {DatePicker} from '../../../../src/index'

const {
  expect,
  render
} = global

describe('props:input: customControl', function () {
  // this.timeout(100)
  
  it('should render a custom button element', () => {
    const did = 'custom-control'
    
    const Unit = () => 
      <DatePicker id={did}
                  customControl={<button id="test-btn">Test button</button>}
      />

    const {container} = render(<Unit/>)
    
    const customControl = container.querySelector('button#test-btn')
    
    expect(customControl).to.exist
    expect(customControl.innerHTML).to.equal('Test button')
  })
})