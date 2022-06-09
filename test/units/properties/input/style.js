import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInputNode,
} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('props:input: style', function () {
  this.timeout(100)

  it("should set the FormControl style.", () => {
    const did = 'style'
    const backgroundColor = `rgb(${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)})`
    
    const Unit = () => 
      <DatePicker id={did}
                  style={{backgroundColor: backgroundColor}}
      />

    const wrapper= mount(<Unit/>)

    const inputNode= getInputNode(wrapper)
    expect(inputNode.style.backgroundColor).to.equal(backgroundColor)
    
    wrapper.unmount()
  })

})