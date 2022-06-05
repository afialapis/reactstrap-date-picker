import React from 'react'
import {DatePicker} from '../../../src/index'

import {
  getInputWrapper
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('prop customInputGroup', function () {
  this.timeout(100)


  it('should render a custom inpupt group element', () => {
    const did = 'custom-input-group-hidden'
    
    const Unit = () => 
      <DatePicker id={did}
                  customInputGroup={<div id="custom-input-group"></div>}
      />

    const wrapper= mount(<Unit/>)

    const customIGroupWrapper = wrapper.find('#custom-input-group')   
    expect(customIGroupWrapper.length).to.equal(1)

    const inputWrapper= getInputWrapper(wrapper)
    expect(inputWrapper.length).to.equal(1)

    wrapper.unmount()
  })
})