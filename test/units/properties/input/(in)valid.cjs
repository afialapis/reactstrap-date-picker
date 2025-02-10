import React from 'react'
import {DatePicker} from '../../../../src/index'
import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render
} = global

describe('props:input: valid/invalid', function () {
  // this.timeout(100)

  it("should not include the is-invalid class when invalid is false", () => {

    const did = 'check-invalid-one'
    
    const Unit = () => 
      <DatePicker id={did}
                  invalid={false}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.classList.contains('is-invalid')).to.equal(false)
    
    
  })
  
  it("should include the is-invalid class when invalid is true", () => {
    const did = 'check-invalid-two'
    
    const Unit = () => 
      <DatePicker id={did}
                  invalid={true}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.classList.contains('is-invalid')).to.equal(true)
    
    
  })
  
  it("should not include the is-valid class when invalid is false", () => {
    const did = 'check-invalid-three'
    
    const Unit = () => 
      <DatePicker id={did}
                  valid={false}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.classList.contains('is-valid')).to.equal(false)
    
    
  })
  
  it("should include the is-valid class when invalid is true", () => {
    const did = 'check-invalid-four'
    
    const Unit = () => 
      <DatePicker id={did}
                  valid={true}
      />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    expect(input.classList.contains('is-valid')).to.equal(true)
    
    
  })
})