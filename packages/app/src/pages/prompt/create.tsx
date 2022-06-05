import React, { useState } from "react";
import { ABI, PROMPTY_ADDRESS } from "../../contracts";
import Spinner from "src/components/Spinner";
import dayjs from "dayjs";
import MainLayout from "src/layouts/MainLayout";
import RadioButton from "src/components/RadioButton";
import TextareaAutosize from "react-textarea-autosize";
import { useElapsedTime } from "use-elapsed-time";
import { ENSName } from "react-ens-name";
import {
  useAccount,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { useRouter } from "next/router";
import { defaultAbiCoder } from "ethers/lib/utils";

const PENDING_TRANSACTION_LOADING_MESSAGE = "TX Loading...";
const PENDING_WRITE_LOADING_MESSAGE = "Submitting...";

type DaysSelection = "1" | "3" | "7";

const Create = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [minChars, setMinChars] = useState("1");
  const [maxChars, setMaxChars] = useState("500");
  const [days, setDays] = useState<DaysSelection>("1");
  const provider = useProvider();
  const { data: account } = useAccount();

  const {
    data,
    write,
    isLoading: isLoadingWrite,
  } = useContractWrite(
    {
      addressOrName: PROMPTY_ADDRESS,
      contractInterface: ABI,
    },
    "create",
    {
      args: [
        text,
        dayjs().add(parseInt(days), "days").unix(),
        minChars,
        maxChars,
      ],
    }
  );
  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    enabled: Boolean(data?.hash),
    confirmations: 4,
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

      router.push(`/prompt/${event[0].toString()}`);
    },
  });

  const isLoading = isLoadingWrite || isTransactionLoading;
  const { elapsedTime } = useElapsedTime({ isPlaying: isTransactionLoading });

  const submitPrompt = async () => {
    if (provider) {
      write();
    } else {
      console.log("no provider");
    }
  };

  const handleDayChange = (_: any, value: string) => {
    setDays(value as DaysSelection);
  };

  return (
    <MainLayout>
      {/* <form> */}
      <div className="relative mb-6">
        <TextareaAutosize
          className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg pb-12 placeholder:text-gray-400"
          minRows={6}
          maxRows={14}
          placeholder="Write your prompt..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isLoading}
        />
        {account && (
          <div className="absolute bottom-4 left-4 py-2 text-sm font-bold text-gray-400">
            <ENSName address={account.address} />
          </div>
        )}
      </div>

      {/* @ts-ignore */}
      <form>
        <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
          How long should the prompt run?
        </h4>
        <div className="flex mb-8">
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault1"
            label="24 Hours"
            value="1"
            checked={days === "1"}
            onClick={handleDayChange}
          />
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault3"
            label="3 Days"
            value="3"
            checked={days === "3"}
            onClick={handleDayChange}
          />
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault7"
            label="7 Days"
            value="7"
            checked={days === "7"}
            onClick={handleDayChange}
          />
        </div>
      </form>

      <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
        What should the length of responses be?
      </h4>
      <div className="flex mb-8 items-center">
        <label className="block text-gray-700 text-sm">Min Chars</label>
        <input
          className="border border-gray-300 p-2 mx-2 w-16"
          value={minChars}
          onChange={(e) => setMinChars(e.target.value)}
          disabled={isLoading}
        />
        <label className="block text-gray-700 text-sm">Max Chars</label>
        <input
          className="border border-gray-300 p-2 mx-2 w-16"
          value={maxChars}
          onChange={(e) => setMaxChars(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        disabled={isLoading}
        onClick={submitPrompt}
        className="rounded-full px-5 py-2 bg-orange-500 text-white text-sm font-bold disabled:opacity-50"
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
          "Post your Prompt"
        )}
      </button>
      {/* </form> */}

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Create;
