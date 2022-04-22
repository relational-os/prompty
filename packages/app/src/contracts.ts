import deploys from "@prompty/contracts/deploys.json";
import { Prompty__factory } from "@prompty/contracts/typechain-types";

import { rinkebyProvider } from "./providers";

// const network = process.env.NODE_ENV === "production" ? "matic" : "mumbai";
const network = "rinkeby";

export const promptyContract = Prompty__factory.connect(
  deploys[network].Prompty.address,
  rinkebyProvider
);
