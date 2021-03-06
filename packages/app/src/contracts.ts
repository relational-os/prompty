import deploys from "@prompty/contracts/deploys.json";
// import { Prompty__factory } from "@prompty/contracts/typechain-types";

// import { rinkebyProvider } from "./providers";

// const network = process.env.NODE_ENV === "production" ? "matic" : "mumbai";
const network = "rinkeby";

// export const promptyContract = Prompty__factory.connect(
//   deploys[network].Prompty.address,
//   rinkebyProvider
// );

export const PROMPTY_ADDRESS = deploys[network].Prompty.address;

export const ABI = [
  {
    inputs: [],
    name: "AlreadyResponded",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPrompt",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPromptID",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPromptParams",
    type: "error",
  },
  {
    inputs: [],
    name: "PromptExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "ResponseTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "ResponseTooShort",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "promptId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "prompt",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minChars",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "maxChars",
        type: "uint128",
      },
    ],
    name: "PromptCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "promptId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "responder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "response",
        type: "string",
      },
    ],
    name: "PromptResponse",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "prompt",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "minChars",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "maxChars",
        type: "uint128",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentPromptId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "prompts",
    outputs: [
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "minChars",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "maxChars",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "promptId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "response",
        type: "string",
      },
    ],
    name: "respond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
