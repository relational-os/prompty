import { expect } from "chai";
import { ethers } from "hardhat";
import { Prompty } from "../typechain-types";

describe("ExampleNFT contract", () => {
  it("can mint", async () => {
    const [deployer] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Prompty");
    const contract = (await ContractFactory.deploy()) as Prompty;

    console.log(deployer);
    await contract.connect(deployer).create("what's up?", 1650775598, 1, 1000);
    // await console.log(await contract.prompts(0));
    // console.log(await contract.respond(0, "the sky"));
    // console.log(await contract.respond(1, "the sky"));
  });
});
