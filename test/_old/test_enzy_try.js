import React from 'react'
///import UUID from "node-uuid"
import {DatePicker} from '../../../src/index'

import { expect } from 'chai';
import { mount, render} from 'enzyme';

let container, calendarContainer;

before(function(){
  container = document.createElement("div")
  container.id = "react"
  // Append container to the body is needed to avoid the error: 
  //   Error: The target 'rdp-form-control-1' could not be identified in the dom, tip: check spelling at tests.bundle.js:82798:13
  // See: https://github.com/reactstrap/reactstrap/issues/773    
  document.body.appendChild(container)
  calendarContainer = document.createElement("div") // optional container for the calendar popover
  calendarContainer.id = "calendarContainer"
  document.body.appendChild(calendarContainer)
})

after(function(){
  document.body.removeChild(container)
  document.body.removeChild(calendarContainer)
}) 


describe('Local State', () => {
  it('hould render an empty date picker', () => {
    const uuid= 'basic'

    const App = () => {
      console.log('RENDER RENDERº')
      return (
        <div>
          <DatePicker id={uuid} />
        </div>        
      )
    }   

    const wrapper= mount(<App/>, {
      attachTo: container
    })

    console.log(wrapper.debug())
    
    console.log(wrapper.find(`input#${uuid}`))

    //expect(wrapper.find(`#react`).length).to.equal(1)
    expect(wrapper.find(`input#${uuid}`).length).to.equal(1)

    


    //console.log(wrapper.find(`input #${uuid}`).property('data-formattedvalue'))

    wrapper.unmount()

  });


});