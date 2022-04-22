import React, { ChangeEvent } from "react";
import { promptyContract } from "../../contracts";
import dayjs from "dayjs";
import MainLayout from "../../layouts/MainLayout";
import { useWallet } from "@gimmixorg/use-wallet";

const Create = () => {
  const { account, provider, connect } = useWallet();
  const [text, setText] = React.useState("");
  const [minChars, setMinChars] = React.useState("1");
  const [maxChars, setMaxChars] = React.useState("500");
  const [days, setDays] = React.useState<"1" | "3" | "7">("1");

  const submitPrompt = async () => {
    if (provider) {
      console.log("provider");
      const signer = await promptyContract.connect(provider.getSigner());

      const tx = await signer.create(
        text,
        dayjs().add(parseInt(days), "minute").unix(),
        minChars,
        maxChars
      );
      console.log("tx", tx.hash);
      await tx.wait(2);
    } else {
      console.log("no provider");
    }
  };

  return (
    <MainLayout>
      <div className="create">
        <div>{account}</div>
        <div>
          <h1>Create a Prompt</h1>
          {/* <form> */}
          <textarea
            className="border border-gray-500 p-2 mx-4"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Min Chars
          </label>
          <input
            className="border border-gray-500 p-2 mx-4"
            value={minChars}
            onChange={(e) => setMinChars(e.target.value)}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Chars
          </label>
          <input
            className="border border-gray-500 p-2 mx-4"
            value={maxChars}
            onChange={(e) => setMaxChars(e.target.value)}
          />
          <button
            onClick={() => {
              !account ? connect() : submitPrompt();
            }}
            className="p-4 bg-blue-500 text-white"
            type="submit"
          >
            {!account ? "Connect Wallet" : "Submit Prompt"}
          </button>
          <form
            style={{ display: "flex" }}
            onChange={(e) => setDays(e.target.value)}
          >
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                checked={days === "1"}
                value="1"
              />
              <label className="form-check-label inline-block text-gray-800">
                1 day
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                checked={days === "3"}
                value="3"
              />
              <label className="form-check-label inline-block text-gray-800">
                3 day
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                checked={days === "7"}
                value="7"
              />
              <label className="form-check-label inline-block text-gray-800">
                7 day
              </label>
            </div>
          </form>
          {/* </form> */}
        </div>{" "}
      </div>
      <style jsx>{`
        .create {
        }
      `}</style>
    </MainLayout>
  );
};

export default Create;
