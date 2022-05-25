import dayjs from "dayjs";
import React from "react";
import { ENSName } from "react-ens-name";
import { PromptType } from "../types";

const Prompt = ({ prompt }: { prompt: PromptType }) => {
  const promptExpired = dayjs().isAfter(dayjs.unix(prompt.endTime));

  return (
    <a href={`/prompt/${prompt.id}`}>
      <div className="bg-white mb-10 p-6 pt-5 rounded-xl">
        <div className="flex justify-between mb-4 items-center">
          <a
            className="text-orange-500 text-sm font-bold border-b-2 border-transparent hover:border-orange-300"
            href={`/author/${prompt.who?.id}`}
          >
            <ENSName address={prompt.who?.id} />
          </a>
          <small className="text-md mb-1 text-gray-500">
            {promptExpired ? (
              <span className="text-gray-400">Completed</span>
            ) : (
              <>
                {dayjs
                  .unix(prompt.endTime)
                  .diff(dayjs.unix(prompt.startTime), "hour")}
                {" hours left"}
              </>
            )}
          </small>
        </div>
        <h3 className="font-ibm text-3xl mb-3 text-gray-800">{prompt.text}</h3>
      </div>
    </a>
  );
};

export default Prompt;
