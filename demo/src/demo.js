import React from 'react';
import ReactDOM from 'react-dom'
import ExampleOne from './ExampleOne'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
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
