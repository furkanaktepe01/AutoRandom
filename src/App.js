import contract from "./contract.js";
import { useState, useEffect } from "react";

function App() {

  const [lastRandomNumber, setLastRandomNumber] = useState(0);

  const contractLink = `https://sepolia.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`;

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
    <div className="App">

      <h1>AutoRandom</h1>
      
      <h3><i>
        AutoRandom is an automated verifiable random number generator, <br/>
        That shares a random number on a daily basis, utilizing Chainlink VRF and OpenZeppelin Defender's Automated Actions
      </i></h3>
      
      <br/><br/><br/><br/><br/><br/>
      
      <h4>Todays Random Number: {lastRandomNumber}</h4>
      
      <br/><br/><br/><br/><br/><br/>
      
      <h4>Contract Address: <a href={contractLink} rel="noreferrer" target="_blank">{process.env.REACT_APP_CONTRACT_ADDRESS}</a></h4>
    
    </div>
  );
}

export default App;
