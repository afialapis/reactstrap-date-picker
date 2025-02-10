import React, {useState, useRef} from 'react'
import {DatePicker} from '../../../../src/index'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:input: inputRef', function () {
  // this.timeout(500)


  it("should check a forwarded ref and inputRef both points to the same element", () => {
    const did = 'using-input-ref'

    const Unit = () => {
      const [value, setValue]= useState('2015-04-15T12:00:00.000Z')

      const mainRef= useRef()
      const inputRef= useRef()
      
      const handleChange = (newValue) => {
        setValue(newValue)
        expect(mainRef.current.getNode()).to.equal(inputRef.current)        
      }

      return (
        <>
          <DatePicker ref        = {mainRef}
                      inputRef   = {inputRef}
                      id         = {did}
                      dateFormat = 'DD/MM/YYYY'
                      onChange   = {(v,_f) => handleChange(v)} 
                      value      = {value}/>
        </>
      )}

    const {container} = render(<Unit/>)

    const input= getInput(container)
    fireEvent.focus(input)
    
    fireEvent.change(input, {target: {value: '01/01/2000'}})
    
    fireEvent.change(input, {target: {value: '01/01/2000'}})

    
  })
})