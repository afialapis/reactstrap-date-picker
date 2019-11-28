import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import expect from 'expect'
import DatePicker from '../src/index'

function hackedRenderIntoDocument(element, container) {
  if (container === undefined) {
    container= document.createElement('div')
  }
  // Needed to avoid the error: 
  //   Error: The target 'date-picker-control-1' could not be identified in the dom, tip: check spelling at tests.bundle.js:82798:13
  // See: https://github.com/reactstrap/reactstrap/issues/773
  document.body.appendChild(container)
  ReactDOM.render(element, container)
  return container
}


describe('DatePicker - checking rendered inputs', function () {
  const now = new Date().toISOString()
  const id = 'my-hidden-input'

  const cont = hackedRenderIntoDocument(
    <DatePicker value        = {now} 
                instanceCount= {1}/>
  )

  const hiddenInputElement = document.getElementById(id);

  //const input = document.querySelector('.date-picker-control-1')

  /*const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(
    dpicker, 'input'
  );*/

  expect(hiddenInputElement.length).toEqual(1);
});