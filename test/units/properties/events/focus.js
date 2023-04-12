import React, {useState} from 'react'
import {DatePicker} from '../../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../../tools/checks'

import {
  getInputWrapper
} from '../../../tools/finders'

const expect= global.expect
const mount= global.mount


describe('props:events: focus', function () {
  this.timeout(500)


  it("should call focus and blur handlers.", () => {
    const did = 'focus-one'
    let value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`

    const Unit = () => {
      const [focused, setFocused]= useState(false)
      const [foo, _setFoo]= useState('foo')

      const focusHandler = (e) => {
        //expect(e.target).to.equal(document.querySelector("input[type=hidden]"))
        expect(e.target).to.equal(document.querySelector("input.form-control"))
        assertIsoStringsHaveSameDate(e.target.value, value)
        setFocused(true)
      }

      const blurHandler = (e) => {
        //expect(e.target).to.equal(document.querySelector("input[type=hidden]"))
        expect(e.target).to.equal(document.querySelector("input.form-control"))
        assertIsoStringsHaveSameDate(e.target.value, value)
        setFocused(false)
      }

      return (
        <div>
          <div>
            <input id='blurringClickTarget' 
                   defaultValue={foo} 
                   onFocus={() => setFocused(false)}
                   onClick={() => setFocused(false)}></input>
            {focused 
              ? <div id="focused">Focused</div> 
              : <div id="blurred">Blurred</div>
            }
          </div>
          <DatePicker id     = {did} 
                      onBlur = {(e) => blurHandler(e)} 
                      onFocus= {(e) => focusHandler(e)} 
                      value  = {value} />
        </div>                    
      )
    }

    const wrapper= mount(<Unit/>)
    const inputWrapper= getInputWrapper(wrapper)    
    
    const focus_it = () => {
      inputWrapper.getDOMNode().focus() 
      inputWrapper.simulate('focus')    // This is not enough to update document.activeElement, dunno why yet
    }

    const check_it_is_blurred_soft = () => expect(wrapper.find('div#blurred').length, 'checking blurred (soft)').to.not.equal(0)
    const check_it_is_focused_soft = () => expect(wrapper.find('div#focused').length, 'checking focused (soft)').to.not.equal(0)

    const check_it_is_blurred_hard = () => expect(inputWrapper.getDOMNode(), 'checking blurred (hard)').to.not.equal(document.activeElement)
    const check_it_is_focused_hard = () => expect(inputWrapper.getDOMNode(), 'checking focused (hard)').to.equal(document.activeElement)    
    
    // It should start blurred
    check_it_is_blurred_soft()
    check_it_is_blurred_hard()

    // Let's focus it
    focus_it()
    check_it_is_focused_soft()
    check_it_is_focused_hard()

    // Let's blur it by focusing external element
    const blurringClickWrapper = wrapper.find('input#blurringClickTarget')  
    blurringClickWrapper.getDOMNode().focus()
    blurringClickWrapper.simulate('focus')

    check_it_is_blurred_soft()
    check_it_is_blurred_hard()
    
    wrapper.unmount()
  })
})