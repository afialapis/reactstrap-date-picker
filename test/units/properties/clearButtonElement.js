import React from 'react'
import {DatePicker} from '../../../src/index'

const expect= global.expect
const mount= global.mount

describe('prop clearButtonElement', function () {
  this.timeout(100)


  it("should render with custom elements", () => {
    const did = 'clear-button'
    const clearButtonElement = <div id="clear-button-element"></div>
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  clearButtonElement={clearButtonElement}
      />

    const wrapper= mount(<Unit/>)

    const clearWrapper= wrapper.find('#clear-button-element')
    expect(clearWrapper.length).to.equal(1)
    
    wrapper.unmount()
  })

  
  it("should render without clear button element", () => {
    const did = 'clear-button-hidden'
    const clearButtonElement = <div id="clear-button-element"></div>
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  clearButtonElement={clearButtonElement}
                  showClearButton={false}
      />

    const wrapper= mount(<Unit/>)

    const clearWrapper= wrapper.find('#clear-button-element')
    expect(clearWrapper.length).to.equal(0)
    
    wrapper.unmount()
    
  })
})