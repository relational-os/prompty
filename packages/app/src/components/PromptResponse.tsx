import React from 'react';
import { ENSName } from 'react-ens-name';
import ReactMarkdown from 'react-markdown';

import { PromptResponseType } from '../types';

const PromptResponse = ({ response }: { response: PromptResponseType }) => {
  return (
    <div className="  mb-5">
      <div className="p-6 pt-5 pb-2 rounded-t-xl">
        <a
          href={`/author/${response.prompt.who?.id}`}
          className="text-orange-500 text-sm font-bold"
        >
          <ENSName address={response.prompt.who?.id} />
        </a>
        <a
          href={`/prompt/${response.prompt?.id}`}
          className="font-ibm text-sm "
        >
          <ReactMarkdown className="text-black font-bold mt-2">
            {response.prompt?.text}
          </ReactMarkdown>{' '}
        </a>
      </div>

      <div className="p-6 pt-5 pb-2 mb-4 bg-white rounded-xl">
        <ReactMarkdown>{response.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PromptResponse;
