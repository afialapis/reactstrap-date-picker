import React from 'react'
import {DatePicker} from '../../../../src/index'

const expect= global.expect
const mount= global.mount

describe('props:calendar: roundedCorners', function () {
  this.timeout(200)

  it("should allow for rounded corners.", () => {
    const withId = 'rdp-with-rounded-borders'
    const woutId = 'rdp-without-rounded-borders'
    
    const Unit = () => 
      <div>
        <DatePicker id={withId}
                    roundedCorners/>
        <DatePicker id={woutId}/>                    
      </div> 

    const wrapper= mount(<Unit/>)
    
    const checkForInputId = (id, expected) => {
      // focus and open calendar
      const inputWrapper = wrapper.find("input#rdp-form-control-" + id)
      inputWrapper.simulate('focus')
  
      // get and click some day in the calendar
      const calendar = wrapper.find("input#" + id).closest('.input-group').find('div.rdp-popover')
      const dayWrapper= calendar.find(`table tbody tr:last-child td`).at(0)
      dayWrapper.simulate('click')

      // check borders on the day cell  
      const dayNode= dayWrapper.getDOMNode()
      expect(dayNode.style.borderRadius).to.equal(expected)      
    }

    checkForInputId(withId, '5px')
    checkForInputId(woutId, '0px')
    
    wrapper.unmount()
  })

})