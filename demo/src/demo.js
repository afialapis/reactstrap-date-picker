import React from 'react';
import ReactDOM from 'react-dom'
import { Container, Row, Col } from 'reactstrap'
import RDPBasic from './samples/RDPBasic'
import RDPDisabled  from './samples/RDPDisabled'
import RDPCustomFormat from './samples/RDPCustomFormat'
import RDPCustomElements from './samples/RDPCustomElements'
import RDPFocusBlur from './samples/RDPFocusBlur'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './demo.scss'

const Pair = ({one, two}) => 
  <Row>
    <Col xs="12" md="6" lg={{ size: 4, offset: 1 }}>
      {one()}
    </Col>
    <Col xs="12" md="6" lg={{ size: 4, offset: 1 }}>
      {two()}
    </Col>         
  </Row>



const Demo = () => {
  return (
    <div>
      <Container fluid>
        
        <Row>
          <Col xs="12" md="6" lg={{ size: 6, offset: 3 }}>
            <h1>
              Reactstrap Date Picker demo
            </h1>
          </Col>          
        </Row>
        <Pair one={RDPBasic} two={RDPDisabled}/>
        <Pair one={RDPCustomFormat} two={RDPCustomElements}/>
        <Pair one={RDPFocusBlur} two={RDPFocusBlur}/>
        
      </Container>
    </div>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
