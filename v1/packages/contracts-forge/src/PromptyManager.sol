// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import {IPrompty} from "./IPrompty.sol";

contract PromptyManager is Ownable {
    IPrompty public prompty;

    constructor(address _prompty) {
        prompty = IPrompty(_prompty);
    }

    function updatePrompty(address _prompty) public onlyOwner {
        prompty = IPrompty(_prompty);
    }
}
