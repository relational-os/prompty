import React from 'react';
import { ENSName } from 'react-ens-name';
import ReactMarkdown from 'react-markdown';

const PromptResponse = ({ response }: { response: PromptResponse }) => {
  return (
    <div className="p-6 pt-5 bg-white rounded-xl mb-5">
      <div className="px-6 pb-4 mb-6 border-b -mx-6 border-orange-100">
        <a href={`/prompt/${response.prompt?.id}`} className="font-ibm text-sm">
          <ReactMarkdown className="text-black inline-block font-bold">
            {response.prompt?.text}
          </ReactMarkdown>{' '}
          <a href={`/author/${response.prompt.who?.id}`}>
            - <ENSName address={response.prompt.who?.id} />
          </a>
        </a>
      </div>

      <div className="mb-4">
        <ReactMarkdown>{response.text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PromptResponse;
