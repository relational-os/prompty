"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompty__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
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
const _bytecode = "0x60806040526000805534801561001457600080fd5b5061072b806100246000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806317e7d99d14610051578063bfa810db1461006d578063d4cf9af714610082578063d8fcb578146100f3575b600080fd5b61005a60005481565b6040519081526020015b60405180910390f35b61008061007b366004610518565b610106565b005b6100c4610090366004610580565b60016020819052600091825260409091208054918101546002909101546001600160801b0380821691600160801b90041684565b6040805194855260208501939093526001600160801b0391821692840192909252166060820152608001610064565b610080610101366004610599565b61025c565b835161013e576040517f8bbe2dc600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806001600160801b0316826001600160801b0316111561017157604051633e740fb360e21b815260040160405180910390fd5b6000826001600160801b03161161019b57604051633e740fb360e21b815260040160405180910390fd5b611000816001600160801b0316106101c657604051633e740fb360e21b815260040160405180910390fd5b600080548152600160208190526040808320428082559281018790556001600160801b03858116600160801b02908716176002820155925490517fab7be343fe9a457e76003123d1df41b4e3c19e374de088eb3805db5a4432f35292610236929133918a918a908a908a9061062d565b60405180910390a160016000808282546102509190610691565b90915550505050505050565b6000548210610297576040517fbad818f300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260016020819052604090912001544211156102e3576040517fbf75c95800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260016020908152604080832033845260030190915290205460ff161561033a576040517f4a3574d200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526001602052604090206002015481516001600160801b039091161115610391576040517f4a8105ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000828152600160205260409020600201548151600160801b9091046001600160801b031610156103ee576040517f4e0f0f3600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260016020818152604080842033808652600390910190925292839020805460ff191690921790915590517fbe9cb8e0cb97f7a26dfb1157ad83fd3c704ba622bb3b160671cc89dca52e58809161044d9185919085906106b7565b60405180910390a15050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261048057600080fd5b813567ffffffffffffffff8082111561049b5761049b610459565b604051601f8301601f19908116603f011681019082821181831017156104c3576104c3610459565b816040528381528660208588010111156104dc57600080fd5b836020870160208301376000602085830101528094505050505092915050565b80356001600160801b038116811461051357600080fd5b919050565b6000806000806080858703121561052e57600080fd5b843567ffffffffffffffff81111561054557600080fd5b6105518782880161046f565b94505060208501359250610567604086016104fc565b9150610575606086016104fc565b905092959194509250565b60006020828403121561059257600080fd5b5035919050565b600080604083850312156105ac57600080fd5b82359150602083013567ffffffffffffffff8111156105ca57600080fd5b6105d68582860161046f565b9150509250929050565b6000815180845260005b81811015610606576020818501810151868301820152016105ea565b81811115610618576000602083870101525b50601f01601f19169290920160200192915050565b87815273ffffffffffffffffffffffffffffffffffffffff8716602082015260e06040820152600061066260e08301886105e0565b60608301969096525060808101939093526001600160801b0391821660a08401521660c0909101529392505050565b600082198211156106b257634e487b7160e01b600052601160045260246000fd5b500190565b83815273ffffffffffffffffffffffffffffffffffffffff831660208201526060604082015260006106ec60608301846105e0565b9594505050505056fea2646970667358221220264c817d05ce523886af884cca11b5a3fda57aeaa8aa06366ea43e66514a346064736f6c63430008090033";
const isSuperArgs = (xs) => xs.length > 1;
class Prompty__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.Prompty__factory = Prompty__factory;
Prompty__factory.bytecode = _bytecode;
Prompty__factory.abi = _abi;
