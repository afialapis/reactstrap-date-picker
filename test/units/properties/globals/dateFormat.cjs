import React, {useState, useRef} from 'react'
import {DatePicker} from '../../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../../tools/checks'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:globals: dateFormat', function () {
  // this.timeout(500)

  it("should automatically insert in YYYY/MM/DD format.", () => {
    const did = 'date-formats-one'
    const Unit = () => 
        <DatePicker id={did}
                    dateFormat='YYYY/MM/DD'
                    />

    const {container} = render(<Unit/>)

    const input= getInput(container)
    
    fireEvent.change(input, {target: {value:  '0'}})
    
    fireEvent.change(input, {target: {value: '19800'}})
    expect(input.value).to.equal('1980/0')
    
    fireEvent.change(input, {target: {value: '1980/053'}})
    expect(input.value).to.equal('1980/05/3')
  })

  it("should render dates in different formats.", () => {
    const FORMATS= {
      d1: 'MM/DD/YYYY',
      d2: 'DD/MM/YYYY',
      d3: 'YYYY/MM/DD'
    }
    const did1 = 'date-formats-d1'
    const did2 = 'date-formats-d2'
    const did3 = 'date-formats-d3'
    const values = {}
    const formattedValues= {}
    const getValues = {}
    const getFormattedValues= {}

    const Unit = () => {
      const [value1, setValue1]= useState(null)
      const [value2, setValue2]= useState(null)
      const [value3, setValue3]= useState(null)

      const ref1= useRef()
      const ref2= useRef()
      const ref3= useRef()

      const handleCLick = () => {
        if (ref1.current) {
          getValues[FORMATS.d1] = ref1.current.getValue()
          getFormattedValues[FORMATS.d1] = ref1.current.getFormattedValue()
        }

        if (ref2.current) {
          getValues[FORMATS.d2] = ref2.current.getValue()
          getFormattedValues[FORMATS.d2] = ref2.current.getFormattedValue()
        }

        if (ref3.current) {
          getValues[FORMATS.d3] = ref3.current.getValue()
          getFormattedValues[FORMATS.d3] = ref3.current.getFormattedValue()
        }
      }

      return (
        <>
          <DatePicker
            ref       = {ref1}
            id        = {did1}
            dateFormat= {FORMATS.d1}
            onChange  = {(v,f) => {setValue1(v); values[FORMATS.d1] = v; formattedValues[FORMATS.d1]= f}}
            value     = {value1}/>
          <DatePicker 
            ref       = {ref2}
            id        = {did2}
            dateFormat= {FORMATS.d2}
            onChange  = {(v,f) => {setValue2(v); values[FORMATS.d2] = v; formattedValues[FORMATS.d2]= f}}
            value     = {value2}/>
          <DatePicker 
            ref       = {ref3}
            id        = {did3}
            dateFormat= {FORMATS.d3}
            onChange  = {(v,f) => {setValue3(v); values[FORMATS.d3] = v; formattedValues[FORMATS.d3]= f}}
            value     = {value3}/>
          <button id="test-button" onClick={handleCLick}/>
        </>
      )}

    const {container} = render(<Unit/>)
    
    const button = container.querySelector("button#test-button")
    const inputD1 = container.querySelector("input#rdp-form-control-" + did1)
    const inputD2 = container.querySelector("input#rdp-form-control-" + did2)
    const inputD3 = container.querySelector("input#rdp-form-control-" + did3)

    const checkDate = (isoString, fmt1, fmt2, fmt3) => {
      fireEvent.focus(inputD1)
      fireEvent.change(inputD1, {target: {value: fmt1}})
      fireEvent.focus(inputD2)
      fireEvent.change(inputD2, {target: {value: fmt2}})
      fireEvent.focus(inputD3)
      fireEvent.change(inputD3, {target: {value: fmt3}})

      fireEvent.click(button)

      expect(inputD1.value).to.equal(fmt1)
      expect(inputD2.value).to.equal(fmt2)
      expect(inputD3.value).to.equal(fmt3)

      assertIsoStringsHaveSameDate(isoString, values[FORMATS.d1])
      assertIsoStringsHaveSameDate(isoString, values[FORMATS.d2])
      assertIsoStringsHaveSameDate(isoString, values[FORMATS.d3])
      assertIsoStringsHaveSameDate(isoString, getValues[FORMATS.d1])
      assertIsoStringsHaveSameDate(isoString, getValues[FORMATS.d2])
      assertIsoStringsHaveSameDate(isoString, getValues[FORMATS.d3])
        
      expect(formattedValues[FORMATS.d1]).to.equal(fmt1)
      expect(formattedValues[FORMATS.d2]).to.equal(fmt2)
      expect(formattedValues[FORMATS.d3]).to.equal(fmt3)
      expect(getFormattedValues[FORMATS.d1]).to.equal(fmt1)
      expect(getFormattedValues[FORMATS.d2]).to.equal(fmt2)
      expect(getFormattedValues[FORMATS.d3]).to.equal(fmt3)    
    }

    checkDate("1980-05-31T12:00:00.000Z", "05/31/1980", "31/05/1980", "1980/05/31")
    checkDate("2015-04-15T12:00:00.000Z", "04/15/2015", "15/04/2015", "2015/04/15")
    checkDate("1999-12-31T12:00:00.000Z", "12/31/1999", "31/12/1999", "1999/12/31")
  })
})