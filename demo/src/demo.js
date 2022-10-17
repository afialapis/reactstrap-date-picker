import React from 'react';
import ReactDOM from 'react-dom'
import { Container, Row, Col } from 'reactstrap'
import RDPBasic from './samples/RDPBasic'
import RDPBasicDisabled  from './samples/RDPBasicDisabled'
import RDPCustomFormat from './samples/RDPCustomFormat'
import RDPCustomClear from './samples/RDPCustomClear'
import RDPCustomPrevNext from './samples/RDPCustomPrevNext'
import RDPCustomPickMonth from './samples/RDPCustomPickMonth'
import RDPCustomPickMonthDefault from './samples/RDPCustomPickMonthDefault'
import RDPCustomWeek from './samples/RDPCustomWeek'
import RDPFocusBlur from './samples/RDPBasicFocusBlur'
import RDPSizeSmall from './samples/RDPSizeSmall'
import RDPSizeLarge from './samples/RDPSizeLarge'
import RDPPlacementTop from './samples/RDPPlacementTop'
import RDPPlacementBottom from './samples/RDPPlacementBottom'
import RDPPlacementLeft from './samples/RDPPlacementLeft'
import RDPPlacementRight from './samples/RDPPlacementRight'
import RDPCustomInputGroup from './samples/RDPCustomInputGroup'
import RDPCustomFormControl from './samples/RDPCustomFormControl'
import RDPValidityValid from './samples/RDPValidityValid'
import RDPValidityInvalid from './samples/RDPValidityInvalid'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './demo.scss'

const Title = ({title}) =>
  <Row>
    <Col xs="12" lg={{ size: 8, offset: 2 }}>
      <h2>
        {title}
      </h2>
    </Col>
  </Row>

const Pair = ({one, two}) => 
  <Row>
    <Col xs="12" lg={{ size: 8, offset: 2 }}>
      <Row>
        <Col xs="12" md="6">
          {one()}
        </Col>
        <Col xs="12" md="6">
          {two()}
        </Col>
      </Row>
    </Col>
  </Row>

const Three = ({one, two, three}) => 
  <Row>
    <Col xs="12" lg={{ size: 8, offset: 2 }}>
      <Row>
        <Col xs="12" md="6" lg="4">
          {one()}
        </Col>
        <Col xs="12" md="6" lg="4">
          {two()}
        </Col>
        <Col xs="12" md="6" lg="4">
          {three()}
        </Col>
      </Row>
    </Col>
  </Row>

const Four = ({one, two, three, four}) => 
  <Row>
    <Col xs="12" lg={{ size: 8, offset: 2 }}>
      <Row>
        <Col xs="12" md="6" lg="3">
          {one()}
        </Col>
        <Col xs="12" md="6" lg="3">
          {two()}
        </Col>
        <Col xs="12" md="6" lg="3">
          {three()}
        </Col>
        <Col xs="12" md="6" lg="3">
          {four()}
        </Col>
      </Row>
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
        
        <Title title="Basic usage"/>
        <Three one={RDPBasic} two={RDPBasicDisabled} three={RDPFocusBlur}/>
        
        <Title title="Placement"/>
        <Four one={RDPPlacementTop} two={RDPPlacementRight} three={RDPPlacementBottom} four={RDPPlacementLeft}/>

        <Title title="Sizing"/>
        <Pair one={RDPSizeSmall} two={RDPSizeLarge}/>


        <Title title="Validity"/>
        <Pair one={RDPValidityValid} two={RDPValidityInvalid}/>

        <Title title="Customize"/>
        <Pair one={RDPCustomFormat} two={RDPCustomWeek}/>
        <Four one={RDPCustomPickMonthDefault} two={RDPCustomPickMonth} three={RDPCustomPrevNext} four={RDPCustomClear}/>
      
        <Pair one={RDPCustomInputGroup} two={RDPCustomFormControl}/>

                
        
        
      </Container>
    </div>
  );
}

ReactDOM.render(<Demo/>, document.getElementById('content'));
