import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput,
} from '../../../tools/finders'

const {
  expect,
  render
} = global

describe('props:input: style', function () {
  // this.timeout(100)

  it("should set the FormControl style.", () => {
    const did = 'style'
    const backgroundColor = `rgb(${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)})`
    
    const Unit = () => 
      <DatePicker id={did}
                  style={{backgroundColor: backgroundColor}}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.style.backgroundColor).to.equal(backgroundColor)
    
    
  })

})