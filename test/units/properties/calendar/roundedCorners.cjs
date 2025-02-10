import React from 'react'
import {DatePicker} from '../../../../src/index'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:calendar: roundedCorners', function () {
  // this.timeout(200)

  it("should allow for rounded corners.", () => {
    const withId = 'rdp-with-rounded-borders'
    const woutId = 'rdp-without-rounded-borders'
    
    const Unit = () => 
      <div>
        <DatePicker id={withId}
                    roundedCorners/>
        <DatePicker id={woutId}/>                    
      </div> 

    const {container} = render(<Unit/>)
    
    const checkForInputId = (id, expected) => {
      // focus and open calendar
      const input = container.querySelector("input#rdp-form-control-" + id)
      fireEvent.focus(input)
  
      // get and click some day in the calendar
      const calendar = container.querySelector("input#" + id).closest('.input-group').querySelector('div.rdp-popover')
      const day= calendar.querySelectorAll(`table tbody tr:last-child td`)[0]
      fireEvent.click(day)

      // check borders on the day cell  
      expect(day.style.borderRadius).to.equal(expected)      
    }

    checkForInputId(withId, '5px')
    checkForInputId(woutId, '0px')
    
    
  })

})