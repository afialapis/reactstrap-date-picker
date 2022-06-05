import { globalProps, globalDefaultProps } from './globals'
import {eventProps} from './events'
import { inputGroupProps} from './inputGroup'
import {inputProps, inputDefaultrops} from './input'
import {calendarProps, calendarDefaultProps} from './calendar'

const datePickerProps= {
  ...globalProps,
  ...eventProps,
  ...inputGroupProps,
  ...inputProps,
  ...calendarProps
}

const datePickerDefaulProps= {
  ...globalDefaultProps,
  ...inputDefaultrops,
  ...calendarDefaultProps
}

export {datePickerProps, datePickerDefaulProps}


