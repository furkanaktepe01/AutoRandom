const web3 = require("web3");

const requestRandomWordsData = web3.eth.abi.encodeFunctionCall({
    name: 'requestRandomWords',
    type: 'function',
    inputs: [{
        type: 'bool',
        name: 'enableNativePayment'
    }]}, ["true"]);

const acceptOwnershipData = web3.eth.abi.encodeFunctionCall({
    name: 'acceptOwnership',
    type: 'function',
    }, []);

console.log(requestRandomWordsData);
// 0x7392a7710000000000000000000000000000000000000000000000000000000000000001

console.log(acceptOwnershipData);
// 0x79ba5097