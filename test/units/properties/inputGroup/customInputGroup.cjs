import React from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render
} = global


describe('props:inputGroup: customInputGroup', function () {
  // this.timeout(100)


  it('should render a custom inpupt group element', () => {
    const did = 'custom-input-group-hidden'
    
    const Unit = () => 
      <DatePicker id={did}
                  customInputGroup={<div id="custom-input-group"></div>}
      />

    const {container} = render(<Unit/>)

    const customIGroup = container.querySelector('#custom-input-group')   
    expect(customIGroup).to.exist

    const input= getInput(container)
    expect(input).to.exist

    
  })
})