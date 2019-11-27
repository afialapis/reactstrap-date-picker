import React from 'react';
import ReactDOM from 'react-dom'
import ExampleOne from './ExampleOne'

import './demo.scss'

const Demo = () => {
  return (
    <div>
      <h1>
        Reactstrap Date Picker example
      </h1>
      <section>
        <ExampleOne/>
      </section>
    </div>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
