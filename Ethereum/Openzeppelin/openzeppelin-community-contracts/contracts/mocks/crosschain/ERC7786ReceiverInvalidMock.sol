// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC7786Receiver} from "../../interfaces/IERC7786.sol";

contract ERC7786ReceiverInvalidMock is IERC7786Receiver {
    function executeMessage(
        bytes32,
        bytes calldata,
        bytes calldata,
        bytes[] calldata
    ) public payable virtual returns (bytes4) {
        return 0xffffffff;
    }
}
