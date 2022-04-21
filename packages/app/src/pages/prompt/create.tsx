import React from "react";
import { useWallet } from "../../useWallet";

import { Prompty } from "@web3-scaffold/contracts/typechain-types";

const Create = () => {
  const { account, connect } = useWallet();

  const c = () => {
    console.log("connect click");
    connect();
  };

  return (
    <div className="create">
      <button onClick={c}>Connect</button>
      <div>{account}</div>
      <style jsx>{`
        .create {
        }
      `}</style>
    </div>
  );
};

export default Create;
