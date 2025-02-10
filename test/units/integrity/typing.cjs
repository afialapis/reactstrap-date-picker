import React from 'react'
import {DatePicker} from '../../../src/index'
import {
  getInput
} from '../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global

describe('integrity: typing', function () {
  // this.timeout(100)

  it('should trim extra characters.', () => {
    const did = 'typing-one'
    const Unit = () => 
        <DatePicker id={did}
                    />

    const {container} = render(<Unit/>)

    const input = getInput(container)

    fireEvent.change(input, {target: {value: "05/31/1980 extra"}})
    expect(input.value).to.equal("05/31/1980")
  })


  it("should automatically insert slashes.", () => {
    const did = 'typing-two'
    const Unit = () => 
        <DatePicker id={did}
                    />

    const {container} = render(<Unit/>)
    
    const input= getInput(container)

    fireEvent.change(input, {target: {value: "05/31/1980 extra"}})
    expect(input.value).to.equal("05/31/1980")
    
    fireEvent.change(input, {target: {value: "0"}})
    fireEvent.change(input, {target: {value: "053"}})
    expect(input.value).to.equal("05/3")
    
    fireEvent.change(input, {target: {value: "05/311"}})
    expect(input.value).to.equal("05/31/1")
  })
})