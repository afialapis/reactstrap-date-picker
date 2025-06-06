import React, {useState} from 'react'
import {DatePicker} from '../../../../src/index'
import {assertIsoStringsHaveSameDate} from '../../../tools/checks'

import {
  getInput
} from '../../../tools/finders'

const {
  expect,
  render,
  fireEvent
} = global


describe('props:events: focus', function () {
  // this.timeout(500)


  it("should call focus and blur handlers.", () => {
    const did = 'focus-one'
    let value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`

    const Unit = () => {
      const [focused, setFocused]= useState(false)
      const [foo, _setFoo]= useState('foo')

      const focusHandler = (e) => {
        //expect(e.target).to.equal(container.querySelector("input[type=hidden]"))
        expect(e.target).to.equal(container.querySelector("input.form-control"))
        assertIsoStringsHaveSameDate(e.target.value, value)
        setFocused(true)
      }

      const blurHandler = (e) => {
        //expect(e.target).to.equal(container.querySelector("input[type=hidden]"))
        expect(e.target).to.equal(container.querySelector("input.form-control"))
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

    const {container} = render(<Unit/>)
    const input= getInput(container)    
    
    const focus_it = () => {
      input.focus() 
      fireEvent.focus(input)    // This is not enough to update document.activeElement, dunno why yet
    }

    const check_it_is_blurred_soft = () => expect(container.querySelector('div#blurred').length, 'checking blurred (soft)').to.not.equal(0)
    const check_it_is_focused_soft = () => expect(container.querySelector('div#focused').length, 'checking focused (soft)').to.not.equal(0)

    const check_it_is_blurred_hard = () => expect(input, 'checking blurred (hard)').to.not.equal(document.activeElement)
    const check_it_is_focused_hard = () => expect(input, 'checking focused (hard)').to.equal(document.activeElement)    
    
    // It should start blurred
    check_it_is_blurred_soft()
    check_it_is_blurred_hard()

    // Let's focus it
    focus_it()
    check_it_is_focused_soft()
    check_it_is_focused_hard()

    // Let's blur it by focusing external element
    const blurringClick = container.querySelector('input#blurringClickTarget')  
    blurringClick.focus()
    fireEvent.focus(blurringClick)

    check_it_is_blurred_soft()
    check_it_is_blurred_hard()
    
    
  })
})