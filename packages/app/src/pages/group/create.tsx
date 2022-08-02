import React, { useState } from "react";
import Spinner from "src/components/Spinner";
import MainLayout from "src/layouts/MainLayout";
import { useElapsedTime } from "use-elapsed-time";
// import { ENSName } from "react-ens-name";
import {
  useAccount,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { useRouter } from "next/router";
import { defaultAbiCoder } from "ethers/lib/utils";
import { ABI, PROMPTY_ADDRESS } from "src/contracts";

const PENDING_TRANSACTION_LOADING_MESSAGE = "tx processing...";
const PENDING_WRITE_LOADING_MESSAGE = "Sign the message...";
const Create = () => {
  const router = useRouter();

  const provider = useProvider();
  const { data: account } = useAccount();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [allowList, setAllowList] = useState([account?.address]);
  // const [visibility, setVisibility] = useState("public");

  const submitGroup = async () => {
    if (provider) {
      write();
    } else {
      console.log("no provider");
    }
  };

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useContractWrite(
    {
      addressOrName: PROMPTY_ADDRESS,
      contractInterface: ABI,
    },
    "createInstance",
    {
      args: [allowList, groupName, description],
    }
  );

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    enabled: Boolean(data?.hash),
    confirmations: 1,
    hash: data?.hash,
    wait: data?.wait,
    onError(err) {
      console.error("error waiting for tx", err);
    },
    onSuccess(data) {
      // here: redirect to the page
      console.log("success", data);

      const event = defaultAbiCoder.decode(
        [
          "uint256",
          "address",
          "string",
          "uint256",
          "uint256",
          "uint128",
          "uint128",
        ],
        data.logs[0].data
      );

      router.push(`/group/${event[0].toString()}`);
    },
  });

  const isLoading = isLoadingWrite || isTransactionLoading;
  const { elapsedTime } = useElapsedTime({ isPlaying: isTransactionLoading });

  return (
    <MainLayout>
      <span>Create your Group!</span>

      <div className="flex flex-col">
        <label>group name</label>
        <input
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <label>description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button
          disabled={isLoading}
          onClick={submitGroup}
          className="rounded-full px-5 py-2 mt-8 bg-orange-500 text-white text-sm font-bold disabled:opacity-50"
          type="submit"
        >
          {isLoading ? (
            <div className="flex">
              <Spinner />
              {isLoadingWrite ? PENDING_WRITE_LOADING_MESSAGE : ""}
              {isTransactionLoading
                ? `${PENDING_TRANSACTION_LOADING_MESSAGE} ${Math.round(
                    elapsedTime
                  )}s`
                : ""}
            </div>
          ) : (
            "create group"
          )}
        </button>
      </div>
    </MainLayout>
  );
};

export default Create;
