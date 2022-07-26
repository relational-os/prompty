// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";

import {Prompty} from "../Prompty.sol";
import {PromptyManager} from "../PromptyManager.sol";

contract DeployPrompty is Script {
    // Deployable contracts
    Prompty public promptyContract;
    PromptyManager public promptyManagerContract;

    function run() public {
        // Deployment config from .env.local file
        Solenv.config(".env.local");
        // address deployer = vm.envAddress("DEPLOYER");

        vm.startBroadcast();
        console.log(msg.sender);

        // Deploy prompty contract
        promptyContract = new Prompty();

        // Deploy PromptyManager contract
        promptyManagerContract = new PromptyManager(address(promptyContract));

        vm.stopBroadcast();
    }
}
