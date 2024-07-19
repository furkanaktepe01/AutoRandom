import contract from "./contract.js";
import { useState, useEffect } from "react";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import { Text } from 'react-font'


function App() {

  const [lastRandomNumber, setLastRandomNumber] = useState(0);

  const contractLink = `https://sepolia.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`;

  const fontName = "Montserrat";

  const update = async () => {  

    const lastRequestId_ = await contract.lastRequestId();

    const lastResult = await contract.getRequestStatus(lastRequestId_);

    const fulfilled = lastResult[0];

    const transitionMessage = "The new random number is being fulfilled...";

    const lastRandomNumber = fulfilled ? BigInt(lastResult[1][0]).toString() : transitionMessage;

    setLastRandomNumber(lastRandomNumber);
  }

  useEffect(() => {  
    
    (async () => {
      update();
    })();

  },[]);

  return (
    <div>

    <br/><br/>

    <Container>

      <Row>
        <Col></Col>
        <Col xs={5}><Text family={fontName}><h1 style={{color:"white", fontSize:"20mm"}}>
         AutoRandom
        </h1></Text></Col>
        <Col></Col>
      </Row>

      <br/>
      
      <Row>
        <Col></Col>
        <Col xs={12}>
          <h5 style={{color:"white", fontSize:"6mm"}}><i><Text family={fontName}>
            AutoRandom is an automated verifiable random number generator
            that shares a random number on a daily basis, utilizing Chainlink VRF and OpenZeppelin Defender's Automated Actions
          </Text></i></h5>
        </Col>
        <Col></Col>
      </Row>

      <br/><br/><br/>

      <Row>
        <Col></Col>
        <Col xs={12}>
          
        <Card 
          style={{ width: '80rem' }} 
          bg="light"
          className="mb-2"
          text="dark">
          <Card.Body>
            <Card.Title as="h1"><Text family={fontName}>Today's Random Number</Text></Card.Title>
            <Card.Text as="h3">
              <br/>
              <Text family={fontName}>{lastRandomNumber}</Text>
              <br/>
            </Card.Text>
          </Card.Body>
        </Card>
          
        </Col>
        <Col></Col>
      </Row>

    <br/><br/><br/>
      
    <Row>
      <Col></Col>
      <Col xs={8}>
        <h4 style={{color:"white"}}><Text family={fontName}>
          Contract Address: <a href={contractLink} 
          rel="noreferrer" target="_blank">{process.env.REACT_APP_CONTRACT_ADDRESS}
        </a></Text></h4>
      </Col>
      <Col></Col>
      <Col xs={3}><Button href="https://github.com/furkanaktepe01/AutoRandom" target="_blank">See the Code</Button></Col>
    </Row>

    </Container>
      
    </div>
  );
}

export default App;
