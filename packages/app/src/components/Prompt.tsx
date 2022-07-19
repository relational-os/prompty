import dayjs from 'dayjs';
import React from 'react';
import { ENSName } from 'react-ens-name';
import { PromptType } from '../types';
import ReactMarkdown from 'react-markdown';
import ReactTimeAgo from "react-time-ago";

const Prompt = ({ prompt }: { prompt: PromptType }) => {
  const promptExpired = dayjs().isAfter(dayjs.unix(prompt.endTime));

  return (
    <a href={`/prompt/${prompt.id}`}>
      <div
        className={`${
          promptExpired
            ? 'bg-[rgba(255,255,255,0.5)] mb-10 p-6 pt-5 rounded-xl relative '
            : 'bg-white mb-10 p-6 pt-5 rounded-xl relative'
        }`}
      >
        <div className="flex justify-between mb-4 items-center">
          <a
            className="text-orange-500 text-sm font-bold border-b-2 border-transparent hover:border-orange-300"
            href={`/author/${prompt.who?.id}`}
          >
            <ENSName address={prompt.who?.id} />
          </a>
          <small className="text-md mb-1 text-gray-500">
            {promptExpired ? (
              <span className="text-gray-400 italic">ended</span>
            ) : (
              <>
                {"ends "}
                <ReactTimeAgo
                  date={Number(prompt.endTime) * 1000}
                  locale="en-US"
                />
              </>
            )}

            {prompt.responses?.length ? (
              <span className="rounded-md bg-[#fef4eb] px-2 py-1 ml-2 -mr-2">
                {prompt.responses?.length}{" "}
                {prompt.responses?.length == 1 ? "response" : "responses"}
              </span>
            ) : (
              ""
            )}
          </small>
        </div>

        <h3 className=" text-xl font-ibm text-gray-900 mb-3">
          {' '}
          <ReactMarkdown>{prompt.text}</ReactMarkdown>
        </h3>
      </div>
    </a>
  );
};

export default Prompt;
