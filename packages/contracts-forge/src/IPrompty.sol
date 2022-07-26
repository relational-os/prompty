// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.9;

interface IPrompty {
    struct PromptyInstance {
        uint256 id;
        string name;
        mapping(address => bool) allowedResponders;
    }

    struct Prompt {
        uint256 startTime;
        uint256 endTime;
        uint128 minChars;
        uint128 maxChars;
        mapping(address => bool) responses;
    }

    event PromptCreated(
        uint256 instanceId,
        uint256 promptId,
        address creator,
        string prompt,
        uint256 startTime,
        uint256 endTime,
        uint128 minChars,
        uint128 maxChars
    );
    event PromptResponse(uint256 promptId, address responder, string response);
    event ResponderAdded(uint256 instanceId, address responder);
    event InstanceCreated(uint256 id, string name);

    error InvalidPrompt();
    error InvalidPromptParams();
    error InvalidPromptID();
    error PromptExpired();
    error AlreadyResponded();
    error ResponseTooShort();
    error ResponseTooLong();
    error NotAllowed();

    function createInstance(
        address[] memory allowedResponders,
        string memory name
    ) external;

    function addResponder(uint256 instanceID, address responder) external;

    function createPrompt(
        uint256 instanceId,
        string memory prompt,
        uint256 endTime,
        uint128 minChars,
        uint128 maxChars
    ) external;

    function respond(uint256 promptId, string memory response) external;
}
