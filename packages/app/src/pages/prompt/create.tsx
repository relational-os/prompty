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
import { DoubleSlider } from "src/components/DoubleSlider";

const PENDING_TRANSACTION_LOADING_MESSAGE = "tx processing...";
const PENDING_WRITE_LOADING_MESSAGE = "Sign the message...";

type DaysSelection = "1" | "3" | "7";

const Create = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [minChars, setMinChars] = useState<number>(100);
  const [maxChars, setMaxChars] = useState<number>(1000);
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
        minChars.toString(),
        maxChars.toString(),
      ],
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
          Prompt duration
        </h4>
        <div className="flex mb-8">
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault1"
            label="24 hours"
            value="1"
            checked={days === "1"}
            onClick={handleDayChange}
          />
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault3"
            label="3 days"
            value="3"
            checked={days === "3"}
            onClick={handleDayChange}
          />
          <RadioButton
            disabled={isLoading}
            id="flexRadioDefault7"
            label="7 days"
            value="7"
            checked={days === "7"}
            onClick={handleDayChange}
          />
        </div>
      </form>

      <h4 className="font-bold mb-6 text-sm ml-2 opacity-70">
        Response length (in characters)
      </h4>

      <div className="flex px-4">
        <div className="flex-1">
          <DoubleSlider
            disabled={isLoading}
            min={Number(minChars)}
            max={Number(maxChars)}
            onChange={([minValue, maxValue]: ReadonlyArray<number>) => {
              setMinChars(minValue);
              setMaxChars(maxValue);
            }}
          ></DoubleSlider>
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={submitPrompt}
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
          "Post your Prompt"
        )}
      </button>
      {/* </form> */}

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Create;
