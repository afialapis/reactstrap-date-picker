import React from 'react'
import {DatePicker} from '../../../../src/index'

const {
  expect,
  render
} = global

describe('props:globals: clearButtonElement', function () {
  // this.timeout(100)


  it("should render with custom elements", () => {
    const did = 'clear-button'
    const clearButtonElement = <div id="clear-button-element"></div>
    const valueDate= new Date('2011-10-05T14:48:00.000Z')
    
    const Unit = () => 
      <DatePicker id={did}
                  value= {valueDate.toISOString()}
                  clearButtonElement={clearButtonElement}
      />

    const {container} = render(<Unit/>)

    const clear= container.querySelector('#clear-button-element')
    expect(clear).to.exist
    
    
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

    const {container} = render(<Unit/>)

    const clear= container.querySelector('#clear-button-element')
    expect(clear).to.not.exist
  })
})