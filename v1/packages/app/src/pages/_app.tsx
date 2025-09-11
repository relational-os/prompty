import "tailwindcss/tailwind.css";
import "./styles.css";

import type { AppProps } from "next/app";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";
import "@rainbow-me/rainbowkit/styles.css";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig } from "wagmi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/relational-os/prompty",
});

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [
    apiProvider.infura(process.env.NEXT_PUBLIC_RINKEBY_RPC_INFURA_ID),
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Prompty",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GraphProvider value={graphClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </GraphProvider>
  );
};

export default MyApp;
