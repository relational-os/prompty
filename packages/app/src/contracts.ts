// import { Prompty__factory } from "@prompty/contracts/typechain-types";

// import { rinkebyProvider } from "./providers";

// const network = process.env.NODE_ENV === "production" ? "matic" : "mumbai";
const network = "rinkeby";

// export const promptyContract = Prompty__factory.connect(
//   deploys[network].Prompty.address,
//   rinkebyProvider
// );

// TODO import this from the deploys.json file from contracts-forge
export const PROMPTY_ADDRESS = "0x6b24fbc6ac225508aba6899cfe844f5d229deaae";

export const ABI = [
  {
    "inputs": [],
    "name": "AlreadyResponded",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPrompt",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPromptID",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPromptParams",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PromptExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ResponseTooLong",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ResponseTooShort",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isVisible",
        "type": "bool"
      }
    ],
    "name": "InstanceCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isVisible",
        "type": "bool"
      }
    ],
    "name": "InstanceUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "instanceId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "promptId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prompt",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "minChars",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "maxChars",
        "type": "uint128"
      }
    ],
    "name": "PromptCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "promptId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "responder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "response",
        "type": "string"
      }
    ],
    "name": "PromptResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "instanceId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "responder",
        "type": "address"
      }
    ],
    "name": "ResponderAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "instanceID",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "allowedResponders",
        "type": "address[]"
      }
    ],
    "name": "addResponders",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "allowedResponders",
        "type": "address[]"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isVisible",
        "type": "bool"
      }
    ],
    "name": "createInstance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "instanceId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "prompt",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "minChars",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "maxChars",
        "type": "uint128"
      }
    ],
    "name": "createPrompt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentPromptId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "instances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isVisible",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "prompts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "minChars",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "maxChars",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "instanceId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "promptId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "response",
        "type": "string"
      }
    ],
    "name": "respond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "instanceId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "newName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "newDescription",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "newIsVisible",
        "type": "bool"
      },
      {
        "internalType": "address[]",
        "name": "newAllowedResponders",
        "type": "address[]"
      }
    ],
    "name": "updateSettings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
