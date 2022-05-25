import React from "react";
import { ABI, PROMPTY_ADDRESS } from "../../contracts";
import dayjs from "dayjs";
import MainLayout from "../../layouts/MainLayout";
import TextareaAutosize from "react-textarea-autosize";
import { ENSName } from "react-ens-name";
import {
  useAccount,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { useRouter } from "next/router";
import { defaultAbiCoder } from "ethers/lib/utils";

const Create = () => {
  const router = useRouter();
  const [text, setText] = React.useState("");
  const [minChars, setMinChars] = React.useState("1");
  const [maxChars, setMaxChars] = React.useState("500");
  const [days, setDays] = React.useState<"1" | "3" | "7">("1");
  const provider = useProvider();
  const { data: account } = useAccount();
  const { data, write } = useContractWrite(
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
  const hash = data?.hash;
  useWaitForTransaction({
    confirmations: 4,
    hash,
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

  console.log("hash", hash);

  const submitPrompt = async () => {
    if (provider) {
      write();
    } else {
      console.log("no provider");
    }
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
          // disabled={!account?.address}
        />
        {account && (
          <div className="absolute bottom-4 left-4 py-2 text-sm font-bold text-gray-400">
            <ENSName address={account.address} />
          </div>
        )}
      </div>

      {hash && (
        <div className="animate-spin text-6xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-full">
          tx submitted bub...
        </div>
      )}

      {/* @ts-ignore */}
      <form onChange={(e) => setDays(e.target.value)}>
        <h4 className="font-bold mb-3 text-sm ml-2 opacity-70">
          How long should the prompt run?
        </h4>
        <div className="flex mb-8">
          <div className="form-check rounded-lg bg-white px-4 py-3 mr-4">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              id="flexRadioDefault1"
              checked={days === "1"}
              value="1"
            />
            <label
              className="form-check-label inline-block text-gray-800 cursor-pointer "
              htmlFor="flexRadioDefault1"
            >
              24 hours
            </label>
          </div>
          <div className="form-check rounded-lg bg-white px-4 py-3 mr-4">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              id="flexRadioDefault3"
              checked={days === "3"}
              value="3"
            />
            <label
              className="form-check-label inline-block text-gray-800 cursor-pointer"
              htmlFor="flexRadioDefault3"
            >
              3 days
            </label>
          </div>
          <div className="form-check rounded-lg bg-white px-4 py-3 mr-4">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              id="flexRadioDefault7"
              checked={days === "7"}
              value="7"
            />
            <label
              className="form-check-label inline-block text-gray-800 cursor-pointer"
              htmlFor="flexRadioDefault7"
            >
              7 days
            </label>
          </div>
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
        />
        <label className="block text-gray-700 text-sm">Max Chars</label>
        <input
          className="border border-gray-300 p-2 mx-2 w-16"
          value={maxChars}
          onChange={(e) => setMaxChars(e.target.value)}
        />
      </div>

      <button
        onClick={() => {
          submitPrompt();
        }}
        className="rounded-full px-5 py-2 bg-orange-500 text-white text-sm font-bold"
        type="submit"
      >
        {"Post your Prompt"}
      </button>
      {/* </form> */}

      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Create;
