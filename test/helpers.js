import { mount, configure} from 'enzyme';
import { expect } from 'chai';

//import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });


let container, calendarContainer;

before(function(){
  container = document.createElement("div")
  container.id = "react"
  // Append container to the body is needed to avoid the error: 
  //   Error: The target 'rdp-form-control-1' could not be identified in the dom, tip: check spelling at tests.bundle.js:82798:13
  // See: https://github.com/reactstrap/reactstrap/issues/773    
  document.body.appendChild(container)
  /*calendarContainer = document.createElement("div") // optional container for the calendar popover
  calendarContainer.id = "calendarContainer"
  document.body.appendChild(calendarContainer)*/
})

after(function(){
  document.body.removeChild(container)
  //document.body.removeChild(calendarContainer)
}) 

const mount_wrap = (component) => {
  const wrapper= mount(component, {
    attachTo: container
  })
  return wrapper  
}


global.expect= expect
global.mount= mount_wrap
//global.calendarContainer= calendarContainer