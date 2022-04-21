// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "ds-test/test.sol";
import "../src/Prompty.sol";
import "./Cheats.sol";

contract PromptyTest is DSTest {
    Cheats constant cheats = Cheats(HEVM_ADDRESS);
    Prompty private prompty;

    function setUp() public {
        prompty = new Prompty();
    }

    function testPrompt() public {
        prompty.create("prompt", block.timestamp + 10, 1, 100);

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
        cheats.expectRevert(Prompty.InvalidPromptID.selector);
        prompty.respond(0, "response");

        prompty.create("prompt", block.timestamp + 10, 1, 100);

        cheats.expectRevert(Prompty.ResponseTooShort.selector);
        prompty.respond(0, "");

        cheats.expectRevert(Prompty.ResponseTooLong.selector);
        prompty.respond(
            0,
            "                                                                                                     "
        );

        prompty.respond(0, "response");

        cheats.expectRevert(Prompty.AlreadyResponded.selector);
        prompty.respond(0, "response");
    }
}
