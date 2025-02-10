import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render
} = global

describe('props:input: autoFocus', function () {
  // this.timeout(100)

  
  it("should have no focus with autoFocus false.", () => {
    const did = 'auto-focus-no'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  autoFocus={false}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)

    // activeElement seems not working on RTL
    // expect(input).to.not.equal(container.activeElement)
    
    expect(input.matches(':focus')).to.be.false
    
  })

  it("should have focus with autoFocus true.", () => {
    const did = 'auto-focus-yes'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  autoFocus={true}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)

    // activeElement seems not working on RTL
    // expect(input).to.equal(container.activeElement)
    
    expect(input.matches(':focus')).to.be.true
    
    
  })
})