import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import fs from "fs/promises";
import { Prompty__factory } from "../typechain-types";

import dotenv from "dotenv";

const exists = (path: string) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

const start = async () => {
  dotenv.config();
  const provider = new JsonRpcProvider(process.env.ETHEREUM_RINKEBY_RPC_URL);
  const deployer = new Wallet(
    `0x${process.env.ETHEREUM_RINKEBY_DEPLOYER_PRIVATE_KEY}`,
    provider
  );

  const deploysPath = `${__dirname}/../deploys.json`;
  const deploys = (await exists(deploysPath))
    ? JSON.parse((await fs.readFile(deploysPath)).toString())
    : {};
  const addr = deploys["rinkeby"]?.["Prompty"].address;

  const prompty = Prompty__factory.connect(addr, deployer);

  // await prompty.create("what's up?", 1650775598, 1, 1000);
  await prompty.respond(0, "the sky");

  console.log(addr);
};

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
