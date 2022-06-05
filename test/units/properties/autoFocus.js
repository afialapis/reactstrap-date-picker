import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getDocument,
  getInputNode
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('prop autoFocus', function () {
  this.timeout(100)


  it("should have no focus with autoFocus false.", () => {
    const did = 'auto-focus-no'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  autoFocus={false}
      />

    const wrapper= mount(<Unit/>)

    const inputNode= getInputNode(wrapper)
    const inputDocument= getDocument(wrapper)

    expect(inputNode).to.not.equal(inputDocument.activeElement)
    
    wrapper.unmount()
  })

  it("should have focus with autoFocus true.", () => {
    const did = 'auto-focus-yes'
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  autoFocus={true}
      />

    const wrapper= mount(<Unit/>)

    const inputNode= getInputNode(wrapper)
    const inputDocument= getDocument(wrapper)
    
    expect(inputNode).to.equal(inputDocument.activeElement)
    
    wrapper.unmount()
  })
})