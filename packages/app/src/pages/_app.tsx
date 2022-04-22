import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";
import { ENSName } from "react-ens-name";
import { useWallet } from "@gimmixorg/use-wallet";

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/relational-os/prompty",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { connect, account } = useWallet();

  return (
    <GraphProvider value={graphClient}>
      {/* TODO: do this in Layout Component */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "pink",
        }}
      >
        <a href="/">
          <h1>Prompty</h1>
        </a>
        {!account ? (
          <button onClick={() => connect()}>Connect Wallet</button>
        ) : (
          <div>
            Wallet Connected: <ENSName address={account} />
          </div>
        )}
      </div>
      <Component {...pageProps} />
    </GraphProvider>
  );
};

export default MyApp;
