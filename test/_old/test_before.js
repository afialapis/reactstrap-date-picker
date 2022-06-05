import React from 'react'
import {render} from 'react-dom'
// import TestUtils from 'react-dom/test-utils'
import assert from 'assert'
// import co from "co"
// import ES6Promise from 'es6-promise'
import UUID from "node-uuid"
import {DatePicker} from '../../../src/index'

import {fireEvent, waitFor, screen} from '@testing-library/react-hooks'


// ES6Promise.polyfill()

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const assertIsoStringsHaveSameDate = (IsoStringA, IsoStringB) => {
  const dateA = new Date(IsoStringA)
  const dateB = new Date(IsoStringB)
  assert.equal(dateA.getMonth(), dateB.getMonth())
  assert.equal(dateA.getDate(), dateB.getDate())
  assert.equal(dateA.getFullYear(), dateB.getFullYear())
}

describe('DatePicker', function () {
  it('loads and displays greeting', async () => {
    const uuid= UUID.v4()

    const App = ({id}) => {
      console.log('RENDER RENDERº')
      return (
        <div>
          <DatePicker id={id} />
        </div>        
      )
    }   

    render(<App id={uuid} />)

    //fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('input'))

    console.log(screen.getByRole('input'))

    //expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    //expect(screen.getByRole('button')).toBeDisabled()
  })

  
//   this.timeout(30000)
//   let container, calendarContainer;
// 
//   before(function(){
//     container = document.createElement("div")
//     container.id = "react"
//     // Append container to the body is needed to avoid the error: 
//     //   Error: The target 'rdp-form-control-1' could not be identified in the dom, tip: check spelling at tests.bundle.js:82798:13
//     // See: https://github.com/reactstrap/reactstrap/issues/773    
//     document.body.appendChild(container)
//     calendarContainer = document.createElement("div") // optional container for the calendar popover
//     calendarContainer.id = "calendarContainer"
//     document.body.appendChild(calendarContainer)
//   })
//   
//   after(function(){
//     document.body.removeChild(container)
//     document.body.removeChild(calendarContainer)
//   }) 
//   
//   it("should render an empty date picker.", co.wrap(function *(){
//     const id = UUID.v4()
//     /*
//     class App extends React.Component {
//       render() {
//         return (
//           <div>
//             <DatePicker id={id} />
//           </div>
//         )
//       }
//     }
//     */
//     const App = ({id}) => {
//       console.log('RENDER RENDERº')
//       return (
//         <div>
//           <DatePicker id={id} />
//         </div>        
//       )
//     }   
//     yield new Promise(function(resolve, _reject){
//       ReactDOM.render(<App />, container, resolve)
//     })
//     console.log('CHECK CHECK')
//     setTimeout(()=> {
//       console.log('CHECK2 CHECK2')
// 
//       const hiddenInputElement = document.getElementById(id)
// 
//       console.log(hiddenInputElement.value)
//       console.log(hiddenInputElement.getAttribute('data-formattedvalue'))
// 
//       assert.equal(hiddenInputElement.value, '')
//       assert.equal(hiddenInputElement.getAttribute('data-formattedvalue'), '')
//       ReactDOM.unmountComponentAtNode(container)
//     }, [1000])
// 
//   }))

  
  //  it("should render a date picker with a value.", co.wrap(function *(){
  //    const id = UUID.v4()
  //    const value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`
  //    const App1 = ({id, value}) => {
  //      
  //      return (
  //        <div>
  //          <DatePicker id={id} value={value} />
  //        </div>        
  //      )
  //    }
  //    /*class App extends React.Component {
  //      render() {
  //        return (
  //          <div>
  //            <DatePicker id={id} value={value} />
  //          </div>
  //        )
  //      }
  //    }*/
  //    yield new Promise(function(resolve, _reject){
  //      ReactDOM.render(<App1 />, container, resolve)
  //    })
  //    const hiddenInputElement = document.getElementById(id)
  //    console.log('----------------------------------')
  //    console.log('----------------------------------')
  //    console.log('----------------------------------')
  //    console.log(hiddenInputElement.value)
  //    console.log(hiddenInputElement.getAttribute('data-formattedvalue'))
  //    assertIsoStringsHaveSameDate(hiddenInputElement.value, value)
  //    assert.equal(hiddenInputElement.getAttribute('data-formattedvalue'), `${value.slice(5,7)}/${value.slice(8,10)}/${value.slice(0,4)}`)
  //    ReactDOM.unmountComponentAtNode(container)
  //  }))
  /*
  it("should open the calendar and select a date.", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(id)
    const inputElement = document.querySelector("input.form-control")

    TestUtils.Simulate.focus(inputElement)
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td")
    assert.equal(hiddenInputElement.value, '')
    assert.equal(hiddenInputElement.getAttribute('data-formattedvalue'), "")
    TestUtils.Simulate.click(dayElement)
    assert.notEqual(hiddenInputElement.value,'')
    assert.notEqual(hiddenInputElement.getAttribute('data-formattedvalue'),"")
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should open the calendar, select a date, and trigger a change event.", co.wrap(function *(){
    const id = UUID.v4()
    let value = null;
    let formattedValue = null;
    class App extends React.Component {
      handleChange(newValue, newFormattedValue){
        value = newValue
        formattedValue = newFormattedValue
      }
      render() {
        return (
          <div>
            <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)}/>
          </div>
        )
      }
    }    
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td")
    assert.equal(value, null)
    assert.equal(formattedValue, null)
    TestUtils.Simulate.click(dayElement)
    assert(typeof value === "string")
    assert(typeof formattedValue === "string")
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should open the calendar and render 29 days on a leap year.", co.wrap(function *(){
    const id = UUID.v4()
    let value = "2016-02-15T00:00:00.000Z"
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} value={value} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const dayElement = document.querySelector("table tbody tr:nth-child(5) td:nth-of-type(2)")
    assert.equal(dayElement.innerHTML, '29')
    TestUtils.Simulate.click(dayElement)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should update via a change handler when the input is changed.", co.wrap(function *(){
    const id = UUID.v4()
    let value = null;
    let formattedValue = null;
    class App extends React.Component {
      handleChange(newValue, newFormattedValue){
        value = newValue
        formattedValue = newFormattedValue
      }
      render() {
        return (
          <div>
            <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} dateFormat="MM/DD/YYYY"/>
          </div>
        )
      }
    }    

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    inputElement.value = "05/31/1980"
    TestUtils.Simulate.change(inputElement)
    const date = new Date(value)
    assert.equal(date.getMonth(), 4)
    assert.equal(date.getDate(), 31)
    assert.equal(date.getFullYear(), 1980)
    assert.equal(formattedValue, "05/31/1980")
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should render with custom elements", co.wrap(function *(){
    const id = UUID.v4()
    const clearButtonElement = <div id="clear-button-element"></div>;
    const previousButtonElement = <div id="previous-button-element"></div>;
    const nextButtonElement = <div id="next-button-element"></div>;

    const d= new Date('2011-10-05T14:48:00.000Z')

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker 
            id={id}
            value= {d.toISOString()}
            dayLabels={spanishDayLabels}
            monthLabels={spanishMonthLabels}
            clearButtonElement={clearButtonElement}
            nextButtonElement={nextButtonElement}
            previousButtonElement={previousButtonElement} />
          </div>
        )
      }
    }  

    const spanishMonthLabel = spanishMonthLabels[d.getMonth()];
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    assert.notEqual(document.getElementById("clear-button-element"),null)
    const inputElement = document.querySelector("input.form-control")    
    TestUtils.Simulate.focus(inputElement)
    const popover = document.querySelector(".popover")
    assert.notEqual(popover.innerHTML.indexOf(spanishMonthLabel),-1)
    assert.notEqual(document.getElementById("previous-button-element"),null)
    assert.notEqual(document.getElementById("next-button-element"),null)
    
    ReactDOM.unmountComponentAtNode(container)
  }))

  
  it("should render without clear button element", co.wrap(function *(){
    const id = UUID.v4()
    const clearButtonElement = <div id="clear-button-element"></div>;

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker 
            id={id}
            clearButtonElement={clearButtonElement}
            showClearButton={false}/>
          </div>
        )
      }
    } 
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    assert.equal(document.getElementById("clear-button-element"), null)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should go to the previous and next month.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}/>
          </div>
        )
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })

    const hiddenInputElement = document.getElementById(id)
    const inputElement = document.querySelector("input.form-control")

    TestUtils.Simulate.focus(inputElement)
    const previousButtonElement = document.querySelector(".rdp-header-previous-wrapper")
    const nextButtonElement = document.querySelector(".rdp-header-next-wrapper")
    
    TestUtils.Simulate.click(previousButtonElement)
    const previousDayElement = document.querySelector("table tbody tr:nth-child(2) td")
    TestUtils.Simulate.click(previousDayElement)
    const previousMonthISOString = hiddenInputElement.value;

    TestUtils.Simulate.focus(inputElement)
    TestUtils.Simulate.click(nextButtonElement)
    const nextDayElement = document.querySelector("table tbody tr:nth-child(2) td")
    TestUtils.Simulate.click(nextDayElement)
    const currentMonthISOString = hiddenInputElement.value;

    assert(previousMonthISOString < currentMonthISOString)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should cycle through every month in the year.", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}/>
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const nextButtonElement = document.querySelector(".rdp-header-next-wrapper")
    for(let i = 0; i < 12; i++) {
      TestUtils.Simulate.click(nextButtonElement)
    }
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should update via a change handler when cleared.", co.wrap(function *(){
    const id = UUID.v4()
    let value = null;
    let formattedValue = null;

    class App extends React.Component {
      handleChange(newValue, newFormattedValue){
        value = newValue
        formattedValue = newFormattedValue
      }
      render() {
        return (
          <div>
            <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)}/>
          </div>
        )
      }
    } 

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const clearButtonElement = document.querySelector("span.input-group-text")
    const dayElement = document.querySelector("table tbody tr:nth-child(2) td")
    TestUtils.Simulate.click(dayElement)
    assert.notEqual(value,null)
    assert.notEqual(formattedValue,null)
    TestUtils.Simulate.click(clearButtonElement)
    assert.equal(value, null)
    assert.equal(formattedValue, null)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should call focus and blur handlers.", co.wrap(function *(){
    const id = UUID.v4()
    //let results = {};
    let value = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`



    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state= {
          focused: false,
          foo: 'foo'
        }
      }

      focusHandler(e) {
        assert.equal(e.target, document.querySelector("input[type=hidden]"))
        assertIsoStringsHaveSameDate(e.target.value, value)
        this.setState({
          focused: true
        })
      }

      blurHandler(e) {
        assert.equal(e.target, document.querySelector("input[type=hidden]"))
        assertIsoStringsHaveSameDate(e.target.value, value)
        this.setState({
          focused: false
        })
      }

      render() {
        return (
          <div>
            <div>
              <input id='blurringClickTarget' defaultValue={this.state.foo}></input>
              {this.state.focused ? <div id="focused">Focused</div> : <div id="blurred">Blurred</div>}
            </div>
            <DatePicker id     = {id} 
                        onBlur = {(e) => this.blurHandler(e)} 
                        onFocus= {(e) => this.focusHandler(e)} 
                        value  = {value} />
          </div>
        )
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    const blurringClickTarget = document.getElementById("blurringClickTarget")
    
    // It should start blurred
    assert.notEqual(document.getElementById("blurred"),null)

    // Let's focus it
    TestUtils.Simulate.focus(inputElement)
    assert.notEqual(document.getElementById("focused"),null)
    
    // Let's blur it again
    TestUtils.Simulate.blur(inputElement)
    blurringClickTarget.click() // React-overlays won't hide on a synthetic event so can't use TestUtils here.
    TestUtils.Simulate.focus(blurringClickTarget) 
    TestUtils.Simulate.click(blurringClickTarget) 
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //WHHHHHHHHHHHHHHHHHHYYYYYYYYYYY
    //assert.notEqual(document.getElementById("blurred"),null)



    ReactDOM.unmountComponentAtNode(container)
  }))

  
  it('should trim extra characters.', co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker  id={id}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })

    const inputElement = document.querySelector("input.form-control")
    inputElement.value = "05/31/1980 extra"
    TestUtils.Simulate.change(inputElement)
    assert.equal(inputElement.value, "05/31/1980")
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should automatically insert slashes.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })

    const inputElement = document.querySelector("input.form-control")
    inputElement.value = "0"
    TestUtils.Simulate.change(inputElement)
    inputElement.value = "053"
    TestUtils.Simulate.change(inputElement)
    assert.equal(inputElement.value, "05/3")
    inputElement.value = "05/311"
    TestUtils.Simulate.change(inputElement)
    assert.equal(inputElement.value, "05/31/1")
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should automatically insert in YYYY/MM/DD format.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}
                        dateFormat="YYYY/MM/DD" />
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })

    const inputElement = document.querySelector("input.form-control")
    inputElement.value = "0"
    TestUtils.Simulate.change(inputElement)
    inputElement.value = "19800"
    TestUtils.Simulate.change(inputElement)
    assert.equal(inputElement.value, "1980/0")
    inputElement.value = "1980/053"
    TestUtils.Simulate.change(inputElement)
    assert.equal(inputElement.value, "1980/05/3")
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should render dates in different formats.", co.wrap(function *(){
    const mm_dd_yyyy_id = "_" + UUID.v4()
    const dd_mm_yyyy_id = "_" + UUID.v4()
    const yyyy_mm_dd_id = "_" + UUID.v4()
    const values = {};
    const formattedValues = {};
    const getValues = {};
    const getFormattedValues = {};

    class App extends React.Component {
      constructor(props) {
        super(props)
        this.inputRef1= React.createRef()
        this.inputRef2= React.createRef()
        this.inputRef3= React.createRef()
        this.state= {
          value: null
        }
      }
      handleChange (newValue, newFormattedValue, dateFormat) {
        this.setState({value:newValue})
        values[dateFormat] = newValue;
        formattedValues[dateFormat] = newFormattedValue;
      }
      componentDidUpdate() {
        getValues["MM/DD/YYYY"] = this.inputRef1.current.getValue()
        getFormattedValues["MM/DD/YYYY"] = this.inputRef1.current.getFormattedValue()
        getValues["DD/MM/YYYY"] = this.inputRef2.current.getValue()
        getFormattedValues["DD/MM/YYYY"] = this.inputRef2.current.getFormattedValue()
        getValues["YYYY/MM/DD"] = this.inputRef3.current.getValue()
        getFormattedValues["YYYY/MM/DD"] = this.inputRef3.current.getFormattedValue()
      }

      render() {
        return (
          <div>
            <DatePicker ref       = {this.inputRef1}
                        id        = {mm_dd_yyyy_id} 
                        dateFormat= "MM/DD/YYYY" 
                        onChange  = {(newValue, newFormattedValue) => this.handleChange(newValue, newFormattedValue, "MM/DD/YYYY")} 
                        value     = {this.state.value} />
            <DatePicker ref       = {this.inputRef2} 
                        id        = {dd_mm_yyyy_id} 
                        dateFormat= "DD/MM/YYYY" 
                        onChange  = {(newValue, newFormattedValue) => this.handleChange(newValue, newFormattedValue, "DD/MM/YYYY")} 
                        value     = {this.state.value} />
            <DatePicker ref       = {this.inputRef3}
                        id        = {yyyy_mm_dd_id} 
                        dateFormat= "YYYY/MM/DD" 
                        onChange  = {(newValue, newFormattedValue) => this.handleChange(newValue, newFormattedValue, "YYYY/MM/DD")} 
                        value     = {this.state.value} />
          </div>
        )
      }
    }  


    const app = <App />;
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(app, container, resolve)
    })

    const mm_dd_yyyy_inputElement = document.querySelector("#rdp-input-group-" + mm_dd_yyyy_id + " input.form-control")
    const dd_mm_yyyy_inputElement = document.querySelector("#rdp-input-group-" + dd_mm_yyyy_id + " input.form-control")
    const yyyy_mm_dd_inputElement = document.querySelector("#rdp-input-group-" + yyyy_mm_dd_id + " input.form-control")
    
    mm_dd_yyyy_inputElement.value = "05/31/1980"
    TestUtils.Simulate.change(mm_dd_yyyy_inputElement)
    TestUtils.Simulate.change(dd_mm_yyyy_inputElement)
    TestUtils.Simulate.change(yyyy_mm_dd_inputElement)
    assert.equal(mm_dd_yyyy_inputElement.value, "05/31/1980")
    assert.equal(dd_mm_yyyy_inputElement.value, "31/05/1980")
    assert.equal(yyyy_mm_dd_inputElement.value, "1980/05/31")
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", values["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", values["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", values["YYYY/MM/DD"])
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", getValues["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", getValues["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("1980-05-31T12:00:00.000Z", getValues["YYYY/MM/DD"])
    assert.equal(formattedValues["MM/DD/YYYY"], "05/31/1980")
    assert.equal(formattedValues["DD/MM/YYYY"], "31/05/1980")
    assert.equal(formattedValues["YYYY/MM/DD"], "1980/05/31")
    assert.equal(getFormattedValues["MM/DD/YYYY"], "05/31/1980")
    assert.equal(getFormattedValues["DD/MM/YYYY"], "31/05/1980")
    assert.equal(getFormattedValues["YYYY/MM/DD"], "1980/05/31")
    dd_mm_yyyy_inputElement.value = "15/04/2015"
    TestUtils.Simulate.change(dd_mm_yyyy_inputElement)
    TestUtils.Simulate.change(mm_dd_yyyy_inputElement)
    TestUtils.Simulate.change(yyyy_mm_dd_inputElement)
    assert.equal(mm_dd_yyyy_inputElement.value, "04/15/2015")
    assert.equal(dd_mm_yyyy_inputElement.value, "15/04/2015")
    assert.equal(yyyy_mm_dd_inputElement.value, "2015/04/15")
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", values["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", values["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", values["YYYY/MM/DD"])
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", getValues["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", getValues["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("2015-04-15T12:00:00.000Z", getValues["YYYY/MM/DD"])
    assert.equal(formattedValues["MM/DD/YYYY"], "04/15/2015")
    assert.equal(formattedValues["DD/MM/YYYY"], "15/04/2015")
    assert.equal(formattedValues["YYYY/MM/DD"], "2015/04/15")
    assert.equal(getFormattedValues["MM/DD/YYYY"], "04/15/2015")
    assert.equal(getFormattedValues["DD/MM/YYYY"], "15/04/2015")
    assert.equal(getFormattedValues["YYYY/MM/DD"], "2015/04/15")
    yyyy_mm_dd_inputElement.value = "1999/12/31"
    TestUtils.Simulate.change(yyyy_mm_dd_inputElement)
    TestUtils.Simulate.change(mm_dd_yyyy_inputElement)
    TestUtils.Simulate.change(dd_mm_yyyy_inputElement)
    assert.equal(mm_dd_yyyy_inputElement.value, "12/31/1999")
    assert.equal(dd_mm_yyyy_inputElement.value, "31/12/1999")
    assert.equal(yyyy_mm_dd_inputElement.value, "1999/12/31")
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", values["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", values["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", values["YYYY/MM/DD"])
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", getValues["MM/DD/YYYY"])
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", getValues["DD/MM/YYYY"])
    assertIsoStringsHaveSameDate("1999-12-31T12:00:00.000Z", getValues["YYYY/MM/DD"])
    assert.equal(formattedValues["MM/DD/YYYY"], "12/31/1999")
    assert.equal(formattedValues["DD/MM/YYYY"], "31/12/1999")
    assert.equal(formattedValues["YYYY/MM/DD"], "1999/12/31")
    assert.equal(getFormattedValues["MM/DD/YYYY"], "12/31/1999")
    assert.equal(getFormattedValues["DD/MM/YYYY"], "31/12/1999")
    assert.equal(getFormattedValues["YYYY/MM/DD"], "1999/12/31")
    ReactDOM.unmountComponentAtNode(container)
  }))

  
  it("week should start on Monday.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}  weekStartsOn={1}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    assert.equal(document.querySelector("table thead tr:first-child td small").innerHTML, "Mon")
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should allow placing the popover calendar in a container specified in the props.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker  id={id} calendarContainer={calendarContainer}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    assert.notEqual(document.querySelector("#calendarContainer .rdp-popover"),null)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should have no focus with autoFocus false.", co.wrap(function *(){
    const id = UUID.v4()
    const value = new Date().toISOString()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} value={value} autoFocus={false}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    assert.notEqual(inputElement,document.activeElement)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should have focus with autoFocus true.", co.wrap(function *(){
    const id = UUID.v4()
    const value = new Date().toISOString()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} value={value} autoFocus={true}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    assert.equal(inputElement, document.activeElement)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should disable the input.", co.wrap(function *(){
    const id = UUID.v4()
    const value = new Date().toISOString()

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} value={value} disabled={true}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    assert.equal(inputElement.disabled, true)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should disable the input.", co.wrap(function *(){
    const id = UUID.v4()
    let value = new Date().toISOString()
    let originalValue = value;

    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id}  onChange={(v,f) => this.handleChange(v,f)} disabled={true}/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    assert.equal(inputElement.disabled, true)
    const clearButtonElement = document.querySelector("span.input-group-text")
    TestUtils.Simulate.click(clearButtonElement)
    assertIsoStringsHaveSameDate(value, originalValue)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it("should display the correct day of the week in the calendar.", co.wrap(function *(){
    const id = UUID.v4()
    let _value = null;
    let _formattedValue = null;

    class App extends React.Component {
      handleChange(newValue, newFormattedValue){
        _value = newValue;
        _formattedValue = newFormattedValue;
      }

      render() {
        return (
          <div>
            <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} dateFormat="MM/DD/YYYY"/>
          </div>
        )
      }
    }  

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    const hiddenInputElement = document.getElementById(id)
    const checkMonthAndYear = function(startValue) {
      inputElement.value = `${startValue.slice(5,7)}/${startValue.slice(8,10)}/${startValue.slice(0,4)}`
      TestUtils.Simulate.change(inputElement)
      TestUtils.Simulate.focus(inputElement)
      const weekElements = document.querySelectorAll("table tbody tr")
      for(let i = 0; i < weekElements.length; i++) {
        const dayElements = weekElements[i].querySelectorAll("td")
        for(let j = 0; j < dayElements.length; j++) {
          const dayElement = dayElements[j];
          if(dayElement.innerHTML === '') {
            return;
          }
          TestUtils.Simulate.click(dayElement)
          let date = new Date(hiddenInputElement.value)
          assert.equal(date.getDay(), j)
        }
      }
    }
    const today = new Date()
    for(let year = today.getFullYear() - 2; year < today.getFullYear() + 2; year++) {
      for(let month = 0; month < 12; month++) {
        const date = new Date()
        date.setMonth(month)
        date.setYear(year)
        checkMonthAndYear(date.toISOString())
      }
    }
    ReactDOM.unmountComponentAtNode(container)
  }))

  
  it("should display the correct day of the week in the calendar when starting on Monday.", co.wrap(function *(){
    const id = UUID.v4()
    let _value = null;
    let _formattedValue = null;


    class App extends React.Component {
      handleChange(newValue, newFormattedValue){
        _value = newValue;
        _formattedValue = newFormattedValue;
      }
      render() {
        return (
          <div>
            <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} dateFormat="MM/DD/YYYY" weekStartsOn={1} />
          </div>
        )
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })

    const inputElement = document.querySelector("input.form-control")
    const hiddenInputElement = document.getElementById(id)
    const checkMonthAndYear = function(startValue) {
      inputElement.value = `${startValue.slice(5,7)}/${startValue.slice(8,10)}/${startValue.slice(0,4)}`
      TestUtils.Simulate.change(inputElement)
      TestUtils.Simulate.focus(inputElement)
      const weekElements = document.querySelectorAll("table tbody tr")
      for(let i = 0; i < weekElements.length; i++) {
        const dayElements = weekElements[i].querySelectorAll("td")
        for(let j = 0; j < dayElements.length; j++) {
          const dayElement = dayElements[j];
          if(dayElement.innerHTML === '') {
            return;
          }
          TestUtils.Simulate.click(dayElement)
          let date = new Date(hiddenInputElement.value)
          assert.equal(date.getDay(), j === 6 ? 0 : j + 1)
        }
      }
    }
    const today = new Date()
    for(let year = today.getFullYear() - 2; year < today.getFullYear() + 2; year++) {
      for(let month = 0; month < 12; month++) {
        const date = new Date()
        date.setMonth(month)
        date.setYear(year)
        checkMonthAndYear(date.toISOString())
      }
    }
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should set a default value", co.wrap(function *(){
    const id = UUID.v4()
    const defaultValue = `${new Date().toISOString().slice(0,10)}T12:00:00.000Z`
    let value = null;
    let _formattedValue = null

    class App extends React.Component {
      handleChange(newValue, newFormattedValue) {
        value = newValue;
        _formattedValue = newFormattedValue;
      }
      render() {
        return (<div>
          <DatePicker defaultValue={defaultValue} id={id} onChange={(v,f) => this.handleChange(v,f)} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(id)
    assertIsoStringsHaveSameDate(hiddenInputElement.value, defaultValue)
    assert.equal(value, null)
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.change(inputElement)
    assert.notEqual(value,null)
    ReactDOM.unmountComponentAtNode(container)
  }))
  */


  // it("should error if value and default value are both set.", co.wrap(function *(){
  //   const value = new Date().toISOString()



  //   try {
  //     yield new Promise(function(resolve, reject){
  //       //try {

  //         class App extends React.Component {
  //           render() {
  //             return (<div>
  //               <DatePicker value={value} defaultValue={value} />
  //             </div>)
  //           }
  //         }


  //         ReactDOM.render(<App />, container, resolve)
  //       /*} catch(e) {
  //         console.log('**********1111111111111')
  //         console.log(e.message)
  //         assert(e.message.indexOf("Conflicting") !== -1)
  //         reject(e)
  //       }*/
  //     })
  //     console.log('**********2222222222222222')

  //     //throw new Error("Value and default value should not be set simultaneously")
  //   } catch (e) {
  //     console.log('----------------------')
  //     console.log('----------------------')
  //     console.log('----------------------')
  //     console.log(e.message)
  //     assert(e.message.indexOf("Conflicting") !== -1)
  //   }

    

  //   /*
  //   try {
  //     yield new Promise(function(resolve, _reject){
  //       ReactDOM.render(<App />, container, resolve)
  //     })
  //     //throw new Error("Value and default value should not be set simultaneously")
  //   } catch (e) {
  //     console.log('----------------------')
  //     console.log('----------------------')
  //     console.log('----------------------')
  //     console.log(e.message)
  //     assert(e.message.indexOf("Conflicting") !== -1)
  //   }
  //   */


  //   ReactDOM.unmountComponentAtNode(container)
  // }))

  /*
  it('should render with today button element', co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker
            id={id}
            showTodayButton={true}
            todayButtonLabel="Today is the day"
            />
        </div>)
      }
    }

    yield new Promise(function(resolve){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector('input.form-control')
    TestUtils.Simulate.focus(inputElement)
    const todayElement = document.querySelector('.u-today-button')
    assert.equal(todayElement.innerText, 'Today is the day')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it('should render a custom button element', co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker
            id={id}
            customControl={<button id="test-btn">Test button</button>} />
        </div>)
      }
    }

    yield new Promise(function(resolve){
      ReactDOM.render(<App />, container, resolve)
    })

    const customElement = document.getElementById('test-btn')

    assert.notEqual(customElement,null)
    assert.equal(customElement.innerText, 'Test button')
    
    ReactDOM.unmountComponentAtNode(container)

  }))


  it("should set the FormControl className.", co.wrap(function *(){
    const id = UUID.v4()
    const className = `_${UUID.v4()}`
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker id={id} className={className} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector(`input.${className}`)
    assert.notEqual(inputElement,null)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should set the FormControl style.", co.wrap(function *(){
    const backgroundColor = `rgb(${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)}, ${Math.round(Math.random() * 255, 0)})`
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker style={{backgroundColor: backgroundColor}}/>
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector('input.form-control')
    assert.equal(inputElement.style.backgroundColor, backgroundColor)
    ReactDOM.unmountComponentAtNode(container)
  }))

  it('should render a custom inpupt group element', co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker
            id={id}
            customInputGroup={<div id="custom-input-group"></div>}/>
        </div>)
      }
    }

    yield new Promise(function(resolve){
      ReactDOM.render(<App />, container, resolve)
    })

    const customGroup = document.getElementById('custom-input-group')
    const innerInput = document.getElementById(id)
    
    assert.notEqual(customGroup,null)
    assert.notEqual(innerInput,null)
    
    
    ReactDOM.unmountComponentAtNode(container)

  }))



  it("should disable dates outside of min and max dates.", co.wrap(function *(){
    const id = UUID.v4()
    const originalValue = "2016-09-15T12:00:00.000Z"
    const minDate = "2016-09-11T00:00:00.000Z"
    const maxDate = "2016-09-17T00:00:00.000Z"
    const justRightValue = "2016-09-11T12:00:00.000Z"
    
    class App extends React.Component {
      
      constructor(props) {
        super(props)
        this.state= {
          value: originalValue
        }
      }

      handleChange(value, _formattedValue){
        this.setState({value:value})
      }

      render() {
        return (<div>
          <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} minDate={minDate} maxDate={maxDate} value={this.state.value} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const hiddenInputElement = document.getElementById(id)
    const tooEarly = document.querySelector("table tbody tr:nth-child(2) td")
    const justRight = document.querySelector("table tbody tr:nth-child(3) td")
    const tooLate = document.querySelector("table tbody tr:nth-child(4) td")
    assert.equal(hiddenInputElement.value, originalValue)
    TestUtils.Simulate.click(tooEarly)
    assert.equal(hiddenInputElement.value, originalValue)
    TestUtils.Simulate.click(justRight)
    assert.equal(hiddenInputElement.value, justRightValue)
    TestUtils.Simulate.click(tooLate)
    assert.equal(hiddenInputElement.value, justRightValue)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should show next and prev buttons if min and max dates are not set.", co.wrap(function *(){
    const id = UUID.v4()
    const displayDate = "2017-07-21T12:00:00.000Z"
    class App extends React.Component {

      constructor(props) {
        super(props)
        this.state= {
          value: displayDate
        }
      }

      handleChange(value, _formattedValue){
        this.setState({value:value})
      }

      render() {
        return (<div>
          <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} value={this.state.value} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const prevButton = document.querySelector(".rdp-header-previous-wrapper")
    const nextButton = document.querySelector(".rdp-header-next-wrapper")
    assert.equal(prevButton.innerHTML, '&lt;')
    assert.equal(nextButton.innerHTML, '&gt;')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should show next and prev buttons if min and max dates are set but not displayed.", co.wrap(function *(){
    const id = UUID.v4()
    const displayDate = "2017-07-21T12:00:00.000Z"
    const minDate = "2017-01-01T12:00:00.000Z"
    const maxDate = "2017-12-31T12:00:00.000Z"
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state= {
          value: displayDate
        }
      }

      handleChange(value, _formattedValue){
        this.setState({value:value})
      }

      render() {
        return (<div>
          <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} minDate={minDate} maxDate={maxDate} value={this.state.value} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const prevButton = document.querySelector(".rdp-header-previous-wrapper")
    const nextButton = document.querySelector(".rdp-header-next-wrapper")
    assert.equal(prevButton.innerHTML, '&lt;')
    assert.equal(nextButton.innerHTML, '&gt;')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should hide previousButtonElement if min date is set and being displayed.", co.wrap(function *(){
    const id = UUID.v4()
    const displayDate = "2017-01-15T12:00:00.000Z"
    const minDate = "2017-01-01T12:00:00.000Z"
    const maxDate = "2017-12-31T12:00:00.000Z"
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state= {
          value: displayDate
        }
      }

      handleChange(value, _formattedValue){
        this.setState({value:value})
      }

      render() {
        return (<div>
          <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} minDate={minDate} maxDate={maxDate} value={this.state.value} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const prevButton = document.querySelector(".rdp-header-previous-wrapper")
    const nextButton = document.querySelector(".rdp-header-next-wrapper")
    assert.equal(prevButton.innerHTML, '')
    assert.equal(nextButton.innerHTML, '&gt;')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should hide nextButtonElement if max date is set and being displayed.", co.wrap(function *(){
    const id = UUID.v4()
    const displayDate = "2017-12-15T12:00:00.000Z"
    const minDate = "2017-01-01T12:00:00.000Z"
    const maxDate = "2017-12-31T12:00:00.000Z"

    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state= {
          value: displayDate
        }
      }

      handleChange(value, _formattedValue){
        this.setState({value:value})
      }

      render() {
        return (<div>
          <DatePicker id={id} onChange={(v,f) => this.handleChange(v,f)} minDate={minDate} maxDate={maxDate} value={this.state.value} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const prevButton = document.querySelector(".rdp-header-previous-wrapper")
    const nextButton = document.querySelector(".rdp-header-next-wrapper")
    assert.equal(prevButton.innerHTML, '&lt;')
    assert.equal(nextButton.innerHTML, '')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should allow for rounded corners.", co.wrap(function *(){
    const withoutRoundedCorners = "_" + UUID.v4()
    const withRoundedCorners = "_" + UUID.v4()

    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker id={withoutRoundedCorners} />
          <DatePicker id={withRoundedCorners} roundedCorners />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const withoutRoundedCorners_inputElement = document.querySelector("#rdp-input-group-" + withoutRoundedCorners + " input.form-control")
    const withRoundedCorners_inputElement = document.querySelector("#rdp-input-group-" + withRoundedCorners + " input.form-control")
    TestUtils.Simulate.focus(withoutRoundedCorners_inputElement)
    const withoutRoundedCornersDayElement = document.querySelector("#rdp-input-group-" + withoutRoundedCorners + " table tbody tr:nth-child(2) td")
    TestUtils.Simulate.click(withoutRoundedCornersDayElement)
    assert.equal(withoutRoundedCornersDayElement.style.borderRadius, '0px')
    TestUtils.Simulate.focus(withRoundedCorners_inputElement)
    const withRoundedCornersDayElement = document.querySelector("#rdp-input-group-" + withRoundedCorners + " table tbody tr:nth-child(2) td")
    TestUtils.Simulate.click(withRoundedCornersDayElement)
    assert.equal(withRoundedCornersDayElement.style.borderRadius, '5px')
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("week should start on Thursday.", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker id={id} weekStartsOn={4} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    assert.equal(document.querySelector("table thead tr:first-child td small").innerHTML, "Thu")
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("week should start on Saturday.", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker id={id} weekStartsOn={6} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    assert.equal(document.querySelector("table thead tr:first-child td small").innerHTML, "Sat")
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should allow for a string to determine calendar placement", co.wrap(function *(){
    const id = UUID.v4()

    class App extends React.Component {
      render() {
        return (<div>
          <DatePicker id={id} calendarPlacement="right" />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const popover = document.querySelector(".rdp-popover.right")
    assert.notEqual(popover,null)
    ReactDOM.unmountComponentAtNode(container)
  }))


  it("should allow for a function to determine calendar placement", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {

      handlePlacement(){
        return "top"
      }

      render() {
        return (<div>
          <DatePicker id={id} calendarPlacement={() => this.handlePlacement()} />
        </div>)
      }
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const inputElement = document.querySelector("input.form-control")
    TestUtils.Simulate.focus(inputElement)
    const popover = document.querySelector(".rdp-popover.top")
    assert.notEqual(popover,null)
    ReactDOM.unmountComponentAtNode(container)
  }))
  
  it("should not include the is-invalid class when invalid is false", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} invalid={false} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(`rdp-input-group-${id}`)
    assert.equal(hiddenInputElement.classList.contains('is-invalid'), false)
    ReactDOM.unmountComponentAtNode(container)
  }))
  
  it("should include the is-invalid class when invalid is true", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} invalid={true} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(`rdp-input-group-${id}`)
    assert.equal(hiddenInputElement.classList.contains('is-invalid'), true)
    ReactDOM.unmountComponentAtNode(container)
  }))
  
  it("should not include the is-valid class when invalid is false", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} valid={false} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(`rdp-input-group-${id}`)
    assert.equal(hiddenInputElement.classList.contains('is-valid'), false)
    ReactDOM.unmountComponentAtNode(container)
  }))
  
  it("should include the is-valid class when invalid is true", co.wrap(function *(){
    const id = UUID.v4()
    class App extends React.Component {
      render() {
        return (
          <div>
            <DatePicker id={id} valid={true} />
          </div>
        )
      }
    }
    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    const hiddenInputElement = document.getElementById(`rdp-input-group-${id}`)
    assert.equal(hiddenInputElement.classList.contains('is-valid'), true)
    ReactDOM.unmountComponentAtNode(container)
  }))
  */
  
})