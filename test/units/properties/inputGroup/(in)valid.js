import React from 'react'
import {DatePicker} from '../../../../src/index'

const expect= global.expect
const mount= global.mount

describe('props:inputGroup: valid/invalid', function () {
  this.timeout(100)

  it("should not include the is-invalid class when invalid is false", () => {

    const did = 'check-invalid-one'
    
    const Unit = () => 
      <DatePicker id={did}
                  invalid={false}
      />

    const wrapper= mount(<Unit/>)

    const inputGroupNode = wrapper.find(`div#rdp-input-group-${did}`).getDOMNode()
    expect(inputGroupNode.classList.contains('is-invalid')).to.equal(false)
    
    wrapper.unmount()
  })
  
  it("should include the is-invalid class when invalid is true", () => {
    const did = 'check-invalid-two'
    
    const Unit = () => 
      <DatePicker id={did}
                  invalid={true}
      />

    const wrapper= mount(<Unit/>)

    const inputGroupNode = wrapper.find(`div#rdp-input-group-${did}`).getDOMNode()
    expect(inputGroupNode.classList.contains('is-invalid')).to.equal(true)
    
    wrapper.unmount()
  })
  
  it("should not include the is-valid class when invalid is false", () => {
    const did = 'check-invalid-three'
    
    const Unit = () => 
      <DatePicker id={did}
                  valid={false}
      />

    const wrapper= mount(<Unit/>)

    const inputGroupNode = wrapper.find(`div#rdp-input-group-${did}`).getDOMNode()
    expect(inputGroupNode.classList.contains('is-valid')).to.equal(false)
    
    wrapper.unmount()
  })
  
  it("should include the is-valid class when invalid is true", () => {
    const did = 'check-invalid-four'
    
    const Unit = () => 
      <DatePicker id={did}
                  valid={true}
      />

    const wrapper= mount(<Unit/>)

    const inputGroupNode = wrapper.find(`div#rdp-input-group-${did}`).getDOMNode()
    expect(inputGroupNode.classList.contains('is-valid')).to.equal(true)
    
    wrapper.unmount()
  })
})