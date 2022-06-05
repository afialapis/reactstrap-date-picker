import React, {useState, useRef} from 'react'
import {DatePicker} from '../../../src/index'

import {
  getInputWrapper,
  getInputNode
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker basics', function () {
  this.timeout(500)


  it("should check a forwarded ref and inputRef both points to the same element", () => {
    const did = 'using-input-ref'

    const Unit = () => {
      const [value, setValue]= useState('2015-04-15T12:00:00.000Z')

      const mainRef= useRef()
      const inputRef= useRef()
      
      const handleChange = (newValue) => {
        // console.log('\nhandleChange.....' + newValue)

        setValue(newValue)
        expect(mainRef.current.getNode()).to.equal(inputRef.current)        
      }

      return (
        <>
          <DatePicker ref={mainRef}
                      inputRef={inputRef}
                      id={did}
                      dateFormat='DD/MM/YYYY'
                      onChange  = {(v,_f) => handleChange(v)} 
                      value     = {value}/>
        </>
      )}

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    const inputNode= getInputNode(wrapper)
    inputWrapper.simulate('focus')
    
    inputNode.value= '01/01/2000'
    inputWrapper.simulate('change')
    
    inputNode.value= '01/01/2000'
    inputWrapper.simulate('change')

    wrapper.unmount()
  })
})