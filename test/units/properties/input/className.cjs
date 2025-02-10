import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render
} = global


describe('props:input: className', function () {
  // this.timeout(100)


  it("should set the FormControl className.", () => {
    const did = 'className'
    const className= 'custom-rdp-classname'
    
    const Unit = () => 
      <DatePicker id={did}
                  className={className}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.className.indexOf(className)).to.above(0)
    expect(container.querySelector(`input.${className}`)).to.exist
    
    
  })
})