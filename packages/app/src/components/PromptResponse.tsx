import React from "react";
import { ENSName } from "react-ens-name";
import ReactMarkdown from "react-markdown";

const PromptResponse = ({ response }: { response: PromptResponse }) => {
  return (
    <div className="promptresponse">
      Response Text:
      <ReactMarkdown>{response.text}</ReactMarkdown>
      <br />
      <a href={`/prompt/${response.prompt?.id}`}>
        Prompt Text:
        <ReactMarkdown>{response.prompt?.text}</ReactMarkdown>
      </a>
      <br />
      Who Prompted:{" "}
      <a href={`/author/${response.prompt?.who?.id}`}>
        <ENSName address={response.prompt?.who?.id} />
      </a>
      <style jsx>{`
        .promptresponse {
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #fafafa;
        }
      `}</style>
    </div>
  );
};

export default PromptResponse;
