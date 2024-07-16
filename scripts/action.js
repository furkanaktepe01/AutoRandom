// OpenZeppelin Defender - Action: AutoRandom

const { Defender } = require('@openzeppelin/defender-sdk');

exports.handler = async function(credentials) {
  
  const client = new Defender(credentials);

  const txRes = await client.relaySigner.sendTransaction({
    to: '0x1fbE346862eaF34cD38F1Bd70550C52FacF21922',
    data: '0x7392a7710000000000000000000000000000000000000000000000000000000000000001',
    speed: 'fast',
    gasLimit: '200000',
  });

  console.log(txRes);
  return txRes.hash;
}
