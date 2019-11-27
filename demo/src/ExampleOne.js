import React, { useState } from 'react';
import DatePicker from '../../src'

const ExampleOne = () => {

  const [adate, setAdate] = useState("2019-06-01T00:22:33.547Z")

  return (
    <div>
        <DatePicker
            name             = 'adate'
            value            = {adate}
            required         = {false}
            checkValidityOnKeyup= {true}
            onChange         = {(v) => {console.log(v); console.log(new Date(v)); setAdate(v)}}
            label            = "A date"
        /> 
    </div>
  );
}

export default ExampleOne
