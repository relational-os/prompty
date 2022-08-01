// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "ds-test/test.sol";
import "../src/Prompty.sol";
import "../src/IPrompty.sol";
import "./Cheats.sol";

contract PromptyTest is DSTest {
    Cheats constant cheats = Cheats(HEVM_ADDRESS);
    Prompty private prompty;

    function setUp() public {
        prompty = new Prompty();
    }

    function testPrompt() public {
        address[] memory allowedResponders;
        allowedResponders[0] = 0xD286064cc27514B914BAB0F2FaD2E1a89A91F314;

        prompty.createInstance(allowedResponders, "test", "test description");

        prompty.createPrompt(0, "prompt", block.timestamp + 10, 1, 100);

        (
            uint256 startTime,
            uint256 endTime,
            uint128 minChars,
            uint128 maxChars
        ) = prompty.prompts(0);

        assertEq(startTime, block.timestamp);
        assertEq(endTime, block.timestamp + 10);
        assertEq(minChars, 1);
        assertEq(maxChars, 100);
    }

    function testRespond() public {
        cheats.expectRevert(IPrompty.InvalidPromptID.selector);
        prompty.respond(0, "response");

        address[] memory allowedResponders;
        allowedResponders[0] = 0xD286064cc27514B914BAB0F2FaD2E1a89A91F314;

        prompty.createInstance(allowedResponders, "test", "test description");
        prompty.createPrompt(0, "prompt", block.timestamp + 10, 1, 100);

        cheats.expectRevert(IPrompty.ResponseTooShort.selector);
        prompty.respond(0, "");

        cheats.expectRevert(IPrompty.ResponseTooLong.selector);
        prompty.respond(
            0,
            "                                                                                                     "
        );

        prompty.respond(0, "response");

        cheats.expectRevert(IPrompty.AlreadyResponded.selector);
        prompty.respond(0, "response");
    }
}
