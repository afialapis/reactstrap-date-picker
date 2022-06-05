import React from 'react';
import PropTypes from 'prop-types';
import {Input, InputGroup, InputGroupText, Popover, PopoverHeader, PopoverBody} from 'reactstrap'
import DatePickerHeader from './DatePickerHeader'
import DatePickerCalendar from './DatePickerCalendar'

const getInstanceCount = () => {
  if (typeof window === 'object') {
    if (window._reactstrapDatePickerInstance == undefined) {
      window._reactstrapDatePickerInstance= 0
    }
    const next= window._reactstrapDatePickerInstance+1
    window._reactstrapDatePickerInstance= next
    return next
  } else if (typeof process === 'object') {
    if (process._reactstrapDatePickerInstance == undefined) {
      process._reactstrapDatePickerInstance= 0
    }
    const next= process._reactstrapDatePickerInstance+1
    process._reactstrapDatePickerInstance= next
    return next
  } else {
    console.error("Reactstrap Date Picker cannot determine environment (it is neither browser's <window> nor Node's <process>).")
    return 1
  }
}

class DatePicker extends React.Component {

  constructor(props) {
    super(props)

    if (this.props.value && this.props.defaultValue) {
      throw new Error('Conflicting DatePicker properties \'value\' and \'defaultValue\'');
    }
    this._inputRef= React.createRef()
    this.hiddenInputRef= React.createRef()
    this.overlayContainerRef= React.createRef()

    this.state= this.getInitialState()
    this.idSuffix= this.makeIdSuffix()
  }

  getInitialState() {
    const state = this.makeDateValues(this.props.value || this.props.defaultValue)
    if (this.props.weekStartsOn > 1) {
      state.dayLabels = this.props.dayLabels
        .slice(this.props.weekStartsOn)
        .concat(this.props.dayLabels.slice(0, this.props.weekStartsOn))
    } else if (this.props.weekStartsOn === 1) {
      state.dayLabels = this.props.dayLabels.slice(1).concat(this.props.dayLabels.slice(0,1))
    } else {
      state.dayLabels = this.props.dayLabels
    }
    state.focused = false
    state.inputFocused = false
    state.placeholder = this.props.placeholder || ''
    state.separator = this.props.dateFormat.match(/[^A-Z]/)[0]
    return state
  }

  makeIdSuffix() {
    // Try <id> or <name> props to determine elements' id suffix
    if (this.props.id!=undefined && this.props.id!='')
      return this.props.id
    if (this.props.name!=undefined && this.props.name!='')
      return this.props.name
    // If none was passed, use global vars
    const iCount= getInstanceCount()
    return iCount.toString()
  }

  get inputRef() {
    return this.props.inputRef || this._inputRef
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }

  onClickOutside(event) {
    event.stopPropagation()

    if (this.state.focused) {
      
      if (this.overlayContainerRef && this.overlayContainerRef.current && !this.overlayContainerRef.current.contains(event.target)) {
            
        const inputFocused= (this.inputRef && this.inputRef.current && this.inputRef.current.contains(event.target))
        this.setState({
          focused: false,
          inputFocused: inputFocused
        });

        if (this.props.onBlur) {
          const event = document.createEvent('CustomEvent');
          event.initEvent('Change Date', true, false);
          this.hiddenInputRef.current.dispatchEvent(event);
          this.props.onBlur(event);
        }
      }
    }
  }
  
  makeDateValues(isoString) {
    let displayDate;
    const selectedDate = isoString ? new Date(`${isoString.slice(0,10)}T12:00:00.000Z`) : null;
    const minDate = this.props.minDate ? new Date(`${this.props.minDate.slice(0,10)}T12:00:00.000Z`) : null;
    const maxDate = this.props.maxDate ? new Date(`${this.props.maxDate.slice(0,10)}T12:00:00.000Z`) : null;

    const inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
    if (selectedDate) {
      displayDate = new Date(selectedDate);
    } else {
      const today = new Date(`${(new Date().toISOString().slice(0,10))}T12:00:00.000Z`);
      if (minDate && Date.parse(minDate) >= Date.parse(today)){
        displayDate = minDate;
      } else if (maxDate && Date.parse(maxDate) <= Date.parse(today)){
        displayDate = maxDate;
      } else {
        displayDate = today;
      }
    }

    return {
      value: selectedDate ? selectedDate.toISOString() : null,
      displayDate: displayDate,
      selectedDate: selectedDate,
      inputValue: inputValue
    };
  }

  clear() {
    if (this.props.onClear) {
      this.props.onClear();
    }
    else {
      this.setState(this.makeDateValues(null));
    }

    if (this.props.onChange) {
      this.props.onChange(null, null);
    }
  }

  handleHide() {
    if (this.state.inputFocused) {
      return;
    }
    this.setState({
      focused: false
    });
    if (this.props.onBlur) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      this.hiddenInputRef.current.dispatchEvent(event);
      this.props.onBlur(event);
    }
  }

  handleKeyDown(e) {
    if (e.which === 9 && this.state.inputFocused) {
      this.setState({
        focused: false
      });

      if (this.props.onBlur) {
        const event = document.createEvent('CustomEvent');
        event.initEvent('Change Date', true, false);
        this.hiddenInputRef.current.dispatchEvent(event);
        this.props.onBlur(event);
      }
    }
  }

  handleFocus() {
    if (this.state.focused === true) {
      return;
    }

    const placement = this.getCalendarPlacement();

    this.setState({
      inputFocused: true,
      focused: true,
      calendarPlacement: placement
    });

    if (this.props.onFocus) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      this.hiddenInputRef.current.dispatchEvent(event);
      this.props.onFocus(event);
    }
  }

  handleBlur() {
    this.setState({
      inputFocused: false
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.inputFocused === true && nextState.inputFocused === false);
  }

  getValue() {
    return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
  }

  getFormattedValue() {
    return this.state.displayDate ? this.state.inputValue : null;
  }

  getCalendarPlacement() {
    const tag = Object.prototype.toString.call(this.props.calendarPlacement);
    const isFunction = tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
    if (isFunction) {
      return this.props.calendarPlacement();
    }
    else {
      return this.props.calendarPlacement;
    }
  }

  makeInputValueString(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    //this method is executed during intialState setup... handle a missing state properly
    const separator = (this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0]);
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      return (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`) + separator + date.getFullYear();
    }
    else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      return (day > 9 ? day : `0${day}`) + separator + (month > 9 ? month : `0${month}`) + separator + date.getFullYear();
    }
    else {
      return date.getFullYear() + separator + (month > 9 ? month : `0${month}`) + separator + (day > 9 ? day : `0${day}`);
    }
  }

  handleBadInput(originalValue) {
    const parts = originalValue.replace(new RegExp(`[^0-9${this.state.separator}]`), '').split(this.state.separator);
    if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (parts[0] && parts[0].length > 2) {
        parts[1] = parts[0].slice(2) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 2);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0,4);
      }
    } else {
      if (parts[0] && parts[0].length > 4) {
        parts[1] = parts[0].slice(4) + (parts[1] || '');
        parts[0] = parts[0].slice(0, 4);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[2] = parts[1].slice(2) + (parts[2] || '');
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2]) {
        parts[2] = parts[2].slice(0,2);
      }
    }
    this.setState({
      inputValue: parts.join(this.state.separator)
    });
  }

  handleInputChange() {
    const originalValue = this.inputRef.current.value;
    const inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator).slice(0,10);

    if (!inputValue) {
      this.clear();
      return;
    }

    let month, day, year;
    if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
      if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      month = inputValue.slice(0,2).replace(/[^0-9]/g, '');
      day = inputValue.slice(3,5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6,10).replace(/[^0-9]/g, '');
    } else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
      if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      day = inputValue.slice(0,2).replace(/[^0-9]/g, '');
      month = inputValue.slice(3,5).replace(/[^0-9]/g, '');
      year = inputValue.slice(6,10).replace(/[^0-9]/g, '');
    } else {
      if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
        return this.handleBadInput(originalValue);
      }

      year = inputValue.slice(0,4).replace(/[^0-9]/g, '');
      month = inputValue.slice(5,7).replace(/[^0-9]/g, '');
      day = inputValue.slice(8,10).replace(/[^0-9]/g, '');
    }

    const monthInteger = parseInt(month, 10);
    const dayInteger = parseInt(day, 10);
    const yearInteger = parseInt(year, 10);
    if (monthInteger > 12 || dayInteger > 31) {
      return this.handleBadInput(originalValue);
    }

    const beforeMinDate = this.props.minDate && Date.parse(originalValue) < Date.parse(this.props.minDate);
    const afterMaxDate = this.props.maxDate && Date.parse(originalValue) > Date.parse(this.props.maxDate);

    if (beforeMinDate || afterMaxDate) {
      return this.handleBadInput(originalValue);
    }

    if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
      const selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
      this.setState({
        selectedDate: selectedDate,
        displayDate: selectedDate,
        value: selectedDate.toISOString()
      });

      if (this.props.onChange) {
        this.props.onChange(selectedDate.toISOString(), inputValue);
      }
    }

    this.setState({
      inputValue: inputValue
    });
  }

  onChangeMonth(newDisplayDate) {
    this.setState({
      displayDate: newDisplayDate
    });
  }

  onChangeDate(newSelectedDate) {
    const inputValue = this.makeInputValueString(newSelectedDate);
    this.setState({
      inputValue: inputValue,
      selectedDate: newSelectedDate,
      displayDate: newSelectedDate,
      value: newSelectedDate.toISOString(),
      focused: false
    });

    if (this.props.onBlur) {
      const event = document.createEvent('CustomEvent');
      event.initEvent('Change Date', true, false);
      this.hiddenInputRef.current.dispatchEvent(event);
      this.props.onBlur(event);
    }

    if (this.props.onChange) {
      this.props.onChange(newSelectedDate.toISOString(), inputValue);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const value = newProps.value;
    if (this.getValue() !== value) {
      this.setState(this.makeDateValues(value));
    }
  }

  renderInputGroup(children) {
    if (this.props.customInputGroup!=undefined)
      return (
        React.cloneElement(this.props.customInputGroup, {children: children})
      )
    return (
      <InputGroup
        size      = {this.props.size}
        id        = {`rdp-input-group-${this.idSuffix}`}
        className = {`rdp-input-group${this.props.invalid ? ' is-invalid' : ''}${this.props.valid ? ' is-valid' : ''}`}
      >
        {children}
      </InputGroup>
    )
  }

  render() {
    const calendarHeader = 
      <DatePickerHeader
          previousButtonElement= {this.props.previousButtonElement}
          nextButtonElement    = {this.props.nextButtonElement}
          displayDate          = {this.state.displayDate}
          minDate              = {this.props.minDate}
          maxDate              = {this.props.maxDate}
          onChange             = {(newDisplayDate) => this.onChangeMonth(newDisplayDate)}
          monthLabels          = {this.props.monthLabels}
          dateFormat           = {this.props.dateFormat}/>

    const calendar =
      <DatePickerCalendar
          cellPadding     = {this.props.cellPadding}
          selectedDate    = {this.state.selectedDate}
          displayDate     = {this.state.displayDate}
          onChange        = {(newSelectedDate) => this.onChangeDate(newSelectedDate)}
          dayLabels       = {this.state.dayLabels}
          weekStartsOn    = {this.props.weekStartsOn}
          showTodayButton = {this.props.showTodayButton}
          todayButtonLabel= {this.props.todayButtonLabel}
          minDate         = {this.props.minDate}
          maxDate         = {this.props.maxDate}
          roundedCorners  = {this.props.roundedCorners}
          showWeeks       = {this.props.showWeeks}/>

    let controlId= `rdp-form-control-${this.idSuffix}`
    if (this.props.customControl!=undefined && this.props.customControl.props.id) {
      controlId= this.props.customControl.props.id
    }

    const control = this.props.customControl
      ? React.cloneElement(this.props.customControl, {
        id          : controlId,
        onKeyDown   : (e) => this.handleKeyDown(e),
        value       : this.state.inputValue || '',
        required    : this.props.required,
        placeholder : this.state.placeholder,
        ref         : this.inputRef,
        disabled    : this.props.disabled,
        onFocus     : () => this.handleFocus(),
        onBlur      : () => this.handleBlur(),
        onChange    : () => this.handleInputChange(),
        className   : `rdp-form-control ${this.props.className || ''} ${this.props.customControl.props.className||''}`,
        style       : {...this.props.customControl.props.style||{},  ...this.props.style || {}},
        autoComplete: this.props.autoComplete,
        onInvalid   : this.props.onInvalid,
        noValidate  : this.props.noValidate,
      })
      : <Input
          id          = {controlId}
          onKeyDown   = {(e) => this.handleKeyDown(e)}
          value       = {this.state.inputValue || ''}
          required    = {this.props.required}
          innerRef    = {this.inputRef}
          type        = "text"
          className   = {`rdp-form-control ${this.props.className || ''}`}
          style       = {this.props.style}
          autoFocus   = {this.props.autoFocus}
          disabled    = {this.props.disabled}
          placeholder = {this.state.placeholder}
          onFocus     = {() => this.handleFocus()}
          onBlur      = {() => this.handleBlur()}
          onChange    = {() => this.handleInputChange()}
          autoComplete= {this.props.autoComplete}
          onInvalid   = {this.props.onInvalid}
          noValidate  = {this.props.noValidate}
          />;
    
    return this.renderInputGroup(
      <>
        {control}
        
        <Popover  className  = {`rdp-popover ${this.state.calendarPlacement}`}
                  toggle     = {() => this.handleHide()}
                  isOpen     = {this.state.focused}
                  container  = {this.props.calendarContainer || this.overlayContainerRef.current}
                  target     = {controlId}
                  placement  = {this.state.calendarPlacement}
                  delay      = {200}
        >
          <PopoverHeader tag = "div">
            {calendarHeader}
          </PopoverHeader>
          
          <PopoverBody>
            {calendar}
          </PopoverBody>
        </Popover>

        <div   ref       = {this.overlayContainerRef}
               className = 'rdp-overlay'/>
        
        <input ref       = {this.hiddenInputRef}
               type      = "hidden"
               className = 'rdp-hidden'
               id        = {this.props.id!=undefined ? this.props.id : `rdp-hidden-${this.idSuffix}`} 
               name      = {this.props.name} 
               value     = {this.state.value || ''} 
               data-formattedvalue = {this.state.value ? this.state.inputValue : ''}
        />
              
        {this.props.showClearButton && !this.props.customControl && 
            <InputGroupText  
                          onClick  = {() => this.props.disabled ? null : this.clear()}
                          style    = {{
                                      opacity: (this.state.inputValue && !this.props.disabled) ? 1 : 0.5,
                                      cursor:(this.state.inputValue && !this.props.disabled) ? 'pointer' : 'not-allowed'
                                    }}
                          className= 'rdp-addon'>
              {this.props.clearButtonElement}
            </InputGroupText>
        }
        
        {this.props.children}
        
     
      </>
    )
  }
}

const propRef= PropTypes.oneOfType([
  // Either a function
  PropTypes.func, 
  // Or the instance of a DOM native element (see the note about SSR)
  PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) })
])

DatePicker.propTypes= {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  cellPadding: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  dayLabels: PropTypes.array,
  monthLabels: PropTypes.array,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  weekStartsOn: PropTypes.number,
  clearButtonElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  showClearButton: PropTypes.bool,
  previousButtonElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  nextButtonElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  calendarPlacement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  dateFormat: PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
  size: PropTypes.string,
  calendarContainer: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  showTodayButton: PropTypes.bool,
  todayButtonLabel: PropTypes.string,
  customControl: PropTypes.object,
  roundedCorners: PropTypes.bool,
  showWeeks: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node

  ]),
  onInvalid: PropTypes.func,
  noValidate: PropTypes.bool,
  valid: PropTypes.bool, 
  invalid: PropTypes.bool,
  customInputGroup: PropTypes.object,
  inputRef: propRef
}


const defaultDateFormat= () => {
  const language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : ''
  const dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
  return dateFormat
}

DatePicker.defaultProps= {
  cellPadding : '5px',
  dayLabels   : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthLabels : ['January', 'February', 'March', 'April',
                 'May', 'June', 'July', 'August', 'September',
                 'October', 'November', 'December'],
  clearButtonElement   : '×',
  previousButtonElement: '<',
  nextButtonElement    : '>',
  calendarPlacement    : 'bottom',
  dateFormat           : defaultDateFormat(),
  showClearButton      : true,
  autoFocus            : false,
  disabled             : false,
  showTodayButton      : false,
  todayButtonLabel     : 'Today',
  autoComplete         : 'on',
  showWeeks            : false,
  /*style: {
    width: '100%'
  },*/
  roundedCorners: false,
  noValidate: false
}


export default DatePicker


