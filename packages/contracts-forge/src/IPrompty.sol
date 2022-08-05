// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.9;

interface IPrompty {
    struct PromptyInstance {
        uint256 id;
        string name;
        bool isVisible;
        string description;
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
    event InstanceCreated(
        uint256 id,
        string name,
        string description,
        bool isVisible
    );
    event InstanceUpdated(
        uint256 id,
        string name,
        string description,
        bool isVisible
    );

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
        string memory name,
        string memory description,
        bool isVisible
    ) external;

    function updateSettings(
        uint256 instanceId,
        string memory newName,
        string memory newDescription,
        bool newIsVisible,
        address[] memory newAllowedResponders
    ) external;

    function addResponders(
        uint256 instanceID,
        address[] memory allowedResponders
    ) external;

    function createPrompt(
        uint256 instanceId,
        string memory prompt,
        uint256 endTime,
        uint128 minChars,
        uint128 maxChars
    ) external;

    function respond(
        uint256 instanceId,
        uint256 promptId,
        string memory response
    ) external;
}
