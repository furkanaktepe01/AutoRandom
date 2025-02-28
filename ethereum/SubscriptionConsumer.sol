// SPDX-License-Identifier: MIT

// Deployed on Sepolia at: 0x1fbE346862eaF34cD38F1Bd70550C52FacF21922
// Subscription ID: 60441069924389038855924997010824808211472063825976676048182257076524312852942

pragma solidity 0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts@1.1.1/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts@1.1.1/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";


contract SubscriptionConsumer is VRFConsumerBaseV2Plus {

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; 
        bool exists; 
        uint256[] randomWords;
    }

    mapping(uint256 => RequestStatus) public s_requests;

    uint256 public s_subscriptionId;

    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 public keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;

    uint32 public callbackGasLimit = 100000;

    uint16 public requestConfirmations = 3;

    uint32 public numWords = 1;

    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B) {
        s_subscriptionId = subscriptionId;
    }

    function requestRandomWords(bool enableNativePayment) external onlyOwner returns (uint256 requestId) {

        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: enableNativePayment
                    })
                )
            })
        );

        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });

        requestIds.push(requestId);
        lastRequestId = requestId;

        emit RequestSent(requestId, numWords);
        
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] calldata _randomWords
    ) internal override {

        require(s_requests[_requestId].exists, "request not found");
        
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        
        require(s_requests[_requestId].exists, "request not found");
        
        RequestStatus memory request = s_requests[_requestId];
        
        return (request.fulfilled, request.randomWords);
    }
    
}
