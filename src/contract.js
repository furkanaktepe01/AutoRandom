import { ethers } from "ethers";

import { contractABI } from "./abi.js";

const network = process.env.REACT_APP_NETWORK;

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const apiKey = process.env.REACT_APP_INFURA_API_KEY;

const provider = new ethers.InfuraProvider(network, apiKey); 

const contract = new ethers.Contract(contractAddress, contractABI, provider);

export default contract;
