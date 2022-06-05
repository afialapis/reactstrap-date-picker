import React, {useState, useRef} from 'react'
import {DatePicker} from '../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../tools/checks'

import {
  getInputWrapper,
  getInputNode
} from '../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('reactstrap-date-picker basics', function () {
  this.timeout(500)

  it("should automatically insert in YYYY/MM/DD format.", () => {
    const did = 'date-formats-one'
    const Unit = () => 
        <DatePicker id={did}
                    dateFormat='YYYY/MM/DD'
                    />

    const wrapper= mount(<Unit/>)

    const inputWrapper= getInputWrapper(wrapper)
    const inputNode= getInputNode(wrapper)
    
    inputNode.value= '0'
    inputWrapper.simulate('change')

    inputNode.value= '19800'
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal('1980/0')

    inputNode.value= '1980/053'
    inputWrapper.simulate('change')
    expect(inputNode.value).to.equal('1980/05/3')
    
    wrapper.unmount()
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
      const [value, setValue]= useState(null)

      const ref1= useRef()
      const ref2= useRef()
      const ref3= useRef()
      
      const handleChange = (newValue, newFormattedValue, format) => {
        setValue(newValue)
        values[format] = newValue
        formattedValues[format]= newFormattedValue

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
          <DatePicker ref={ref1}
                  id={did1}
                  dateFormat= {FORMATS.d1}
                  onChange  = {(v,f) => handleChange(v,f,FORMATS.d1)} 
                  value     = {value}/>
          <DatePicker ref={ref2}
                  id={did2}
                  dateFormat= {FORMATS.d2}
                  onChange  = {(v,f) => handleChange(v,f,FORMATS.d2)} 
                  value     = {value}/>
          <DatePicker ref={ref3}
                  id={did3}
                  dateFormat= {FORMATS.d3}
                  onChange  = {(v,f) => handleChange(v,f,FORMATS.d3)} 
                  value     = {value}/>
        </>
      )}

    const wrapper= mount(<Unit/>)

    const inputWrapperD1 = wrapper.find("input#rdp-form-control-" + did1)
    const inputWrapperD2 = wrapper.find("input#rdp-form-control-" + did2)
    const inputWrapperD3 = wrapper.find("input#rdp-form-control-" + did3)

    const inputNodeD1= inputWrapperD1.getDOMNode()
    const inputNodeD2= inputWrapperD2.getDOMNode()
    const inputNodeD3= inputWrapperD3.getDOMNode()
    
    const checkDate = (isoString, fmt1, fmt2, fmt3, wchange) => {
  
      if      (wchange==1) {
        inputNodeD1.value = fmt1
        inputWrapperD1.simulate('change')
        inputWrapperD2.simulate('change')
        inputWrapperD3.simulate('change')
      } else if (wchange==2) {
        inputNodeD2.value = fmt2
        inputWrapperD2.simulate('change')
        inputWrapperD1.simulate('change')
        inputWrapperD3.simulate('change')
      } else {
        inputNodeD3.value = fmt3
        inputWrapperD3.simulate('change')
        inputWrapperD2.simulate('change')
        inputWrapperD1.simulate('change')
      }


      inputWrapperD1.simulate('change')
      inputWrapperD2.simulate('change')
      inputWrapperD3.simulate('change')
    
      expect(inputNodeD1.value).to.equal(fmt1)
      expect(inputNodeD2.value).to.equal(fmt2)
      expect(inputNodeD3.value).to.equal(fmt3)

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

    checkDate("1980-05-31T12:00:00.000Z", "05/31/1980", "31/05/1980", "1980/05/31", 1)

    checkDate("2015-04-15T12:00:00.000Z", "04/15/2015", "15/04/2015", "2015/04/15", 2)

    checkDate("1999-12-31T12:00:00.000Z", "12/31/1999", "31/12/1999", "1999/12/31", 3)
    
    wrapper.unmount()
  })
})