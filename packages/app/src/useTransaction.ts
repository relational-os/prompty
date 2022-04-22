import type { ContractTransaction } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWallet } from "@gimmixorg/use-wallet";
import createDebug from "debug";
import { useCallback } from "react";
import createStore from "zustand";

import { chainConfig } from "./chainConfig";

const debug = createDebug("app:useTransaction");

const [chainId, chain] = chainConfig(
  process.env.NODE_ENV === "production" ? "matic" : "mumbai"
);

export enum WalletState {
  idle = "idle",
  connectingWallet = "connectingWallet",
  switchingNetwork = "switchingNetwork",
  addingNetwork = "addingNetwork",
  sendingTransaction = "sendingTransaction",
  confirmingTransaction = "confirmingTransaction",
}

type State = {
  walletState: WalletState;
  walletError: any | null;
};

const useStore = createStore<State>(() => ({
  walletState: WalletState.idle,
  walletError: null,
}));

export const useTransaction = (
  createTransaction: (provider: Web3Provider) => Promise<ContractTransaction>
) => {
  const { provider, connect } = useWallet();
  const { walletState, walletError } = useStore();

  // TODO: don't send transaction if wallet is in a non-idle state?
  // TODO: catch errors and build better messages

  const connectAndTransact = useCallback(async () => {
    let currentProvider = provider;

    if (!currentProvider) {
      debug("no provider, connecting to wallet");
      useStore.setState({ walletState: WalletState.connectingWallet });
      const connectState = await connect();
      debug("got connect state", connectState);
      currentProvider = connectState.provider;
    }

    // TODO: check this for metamask-provided chain IDs (doing just add and not switch gave an error)
    debug("asking wallet to add/switch network");
    useStore.setState({ walletState: WalletState.switchingNetwork });
    try {
      if (currentProvider.network.chainId !== chainId) {
        await currentProvider.send("wallet_switchEthereumChain", [
          { chainId: chain.chainId },
        ]);
      }
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        await currentProvider.send("wallet_addEthereumChain", [chain]);
        // Immediately check if the network is correct, because web3modal
        // doesn't throw if the network switch is cancelled from above call
        // https://github.com/Web3Modal/web3modal/issues/363
        const currentNetwork = await currentProvider.getNetwork();
        if (currentNetwork.chainId !== chainId) {
          throw new Error(`You must switch your wallet to ${chain.chainName}`);
        }
      } else {
        throw switchError;
      }
    }

    debug("asking wallet to send transaction");
    useStore.setState({ walletState: WalletState.sendingTransaction });
    const tx = await createTransaction(currentProvider);

    debug("waiting for transaction confirmations");
    useStore.setState({ walletState: WalletState.confirmingTransaction });
    await tx.wait();

    debug("transaction complete!");
  }, [connect, createTransaction, provider]);

  const sendTransaction = useCallback(async () => {
    try {
      await connectAndTransact();
      useStore.setState({ walletState: WalletState.idle, walletError: null });
      return true;
    } catch (walletError: any) {
      debug("got error", walletError);
      useStore.setState({ walletState: WalletState.idle, walletError });
      return false;
    }
  }, [connectAndTransact]);

  return {
    sendTransaction,
    walletState,
    walletError,
  };
};
